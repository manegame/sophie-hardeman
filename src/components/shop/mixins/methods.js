import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'ADD_TO_CART',
      'REMOVE_FROM_CART',
      'ADD_CUSTOMER_INFO',
      'SET_SHIPPING',
      'PLACE_ORDER',
      'PAY_ORDER'
    ]),
    validate() {
      this.missingBilling = []
      Object.keys(this.billing).forEach(key => {
        if (key !== 'state') { // exceptions
          if (this.billing[key] === null) this.missingBilling.push(key)
        }
      })
      console.log('validate form', this.missingBilling)
      if (this.missingBilling.length === 0) this.billingComplete = true
      else this.billingComplete = false
    },
    setShippingInfo() {
      console.log('set shipping info called')
      // only set the billing info to shipping when billing is the same as shipping info
      if (this.sameAsBilling) {
        // if not, set same info as the billing address
        this.shipping.firstName = this.billing.firstName
        this.shipping.lastName = this.billing.lastName
        this.shipping.address = this.billing.address
        this.shipping.city = this.billing.city
        this.shipping.state = this.billing.state
        this.shipping.postcode = this.billing.postcode
        this.shipping.country = this.billing.country
      }
    },
    setShippingZone(event) {
      console.log('set shipping zone called')
      // prepare country filtering
      this.selectedCountry = this.shop.countryList.find(c => { return c[1] === this.shipping.country })
      const continentCode = this.selectedCountry[0]
      const countryCode = this.selectedCountry[1]
      // make an array which contains the id of the shipping zone and locations
      const flatData = []
      this.shop.shipping_zones.map(zone => {
        zone.locations.forEach(location => flatData.push({ location: location, id: zone.id }))
      })
      const byCountry = flatData.find(item => item.location.code === countryCode)
      const byContinent = flatData.find(item => item.location.code === continentCode)
      // set shippingZone
      if (byCountry !== undefined) {
        // try by country
        this.shippingZone = this.shop.shipping_zones.find(zone => zone.id === byCountry.id)
      } else if (byContinent !== undefined) {
        // try by continent
        this.shippingZone = this.shop.shipping_zones.find(zone => zone.id === byContinent.id)
      } else {
        // set to `other`
        this.shippingZone = this.shop.shipping_zones.find(zone => zone.id === 0)
      }
      if (event !== undefined && event.srcElement.parentElement.id !== 'shipping_methods') this.setShippingMethod()
    },
    setShippingMethod(event) {
      console.log('set shipping method', event)
      if (!event) {
        let freeShipping = this.shippingZone.methods.find(method => { return method.method_id === 'free_shipping' })
        if (freeShipping !== undefined) {
          // check how much you need to spend for free delivery
          let floor = Number(freeShipping.settings.min_amount.value)
          // set free shipping
          if (this.cartTotal > floor && this.selectedMethod !== 'local_pickup') {
            this.selectedMethod = 'free_shipping'
          } else if (this.cartTotal < floor && this.selectedMethod === 'free_shipping') {
            this.selectedMethod = 'flat_rate'
          }
        }
        if (this.selectedMethod === undefined || this.selectedMethod === null) {
          this.selectedMethod = 'flat_rate'
        }
        // check which shipping methods are available and handle them
        let shipMe = {}
        let method = this.shippingZone.methods.find(m => { return m.method_id === this.selectedMethod })
        if (method !== undefined) {
          shipMe.method_id = method.method_id
          shipMe.method_title = method.method_title
          if (method.method_id === 'flat_rate') {
            shipMe.total = method.settings.cost.value
          }
        }
        this.SET_SHIPPING(shipMe)
      }
    },
    pay() {
      //
      // this payment function does a couple of things.
      // 1. ADD_CUSTOMER INFO pushes the billing and shipping into an order object for the REST API, then
      // 2. PLACE_ORDER sends the order
      //
      this.ADD_CUSTOMER_INFO({
        billing: this.billing,
        shipping: this.shipping
      }).then(() => {
        if (!this.billingComplete) {
          this.msg = 'please fill in the missing fields'
          return
        }
        this.msg = 'hold on, processing...'
        this.PLACE_ORDER(this.shop.order).then(() => {
          if (this.shop.payment.orderResponse.message) {
            this.msg = 'Something went wrong. Please try again or contact <a href="mailto:sales@hardeman.co">sales@hardeman.co</a>. Apologies for the inconvenience'
          } else {
            this.$router.push({ name: 'order-complete' })
          }
        })
      })
    },
    paypalScriptLoaded() {
      this.paypalLoaded = true
      this.paypalInit()
    },
    paypalInit() {
      const vm = this
      // eslint-disable-next-line
      paypal.Button.render({
        env: 'sandbox', // 'production' or 'sandbox',

        commit: true, // Show a 'Pay Now' button

        // PayPal Client IDs - replace with your own
        // Create a PayPal app: https://developer.paypal.com/developer/applications/create
        client: {
          sandbox: 'ARxqTmcXElXkbqbdVOKiK_Icq0mdRimros412LhoCZUwPtutl05ab9qoNVP96F0jGw8JjW5LpPYW4FsA',
          production: 'AULkwxKm8-yuCK1jhRf_QRv_ZkvnSgcKJ4SrjElsFBfmpPzrSlmipnFMmK23mBWSLhmOMJpQUX90aV9C'
        },

        style: {
          color: 'gold',
          size: 'small'
        },

        payment: (data, actions) => {
          return actions.payment.create({
            payment: {
              transactions: [
                {
                  amount: { total: '' + vm.total + '', currency: 'EUR' }
                }
              ]
            }
          })
        },

        onAuthorize: function(data, actions) {
          return actions.payment.execute().then(function(payment) {
            vm.shop.order.payment_method = 'paypal'
            vm.shop.order.set_paid = true
            vm.ADD_CUSTOMER_INFO({
              billing: vm.billing,
              shipping: vm.shipping
            }).then(() => {
              vm.PLACE_ORDER(vm.shop.order).then(() => {
                if (vm.shop.payment.orderResponse.message) {
                  vm.msg = 'Something went wrong. Please contact <a href="mailto:sales@hardeman.co">sales@hardeman.co</a>. Our apologies for the inconvenience'
                } else {
                  vm.$router.push({ name: 'order-complete' })
                }
              })
            })
            // The payment is complete!
            // You can now show a confirmation message to the customer
          })
        },

        onCancel: function(data, actions) {
          vm.msg = ''
          /*
          * Buyer cancelled the payment
          */
        },

        onError: function(err) {
          vm.msg = 'There was an error processing your payment. Please contact <a href="mailto:sales@hardeman.co">sales@hardeman.co</a>. Our apologies for the inconvenience.'
          return err
        }
      }, '#paypal-button')
    }
  }
}

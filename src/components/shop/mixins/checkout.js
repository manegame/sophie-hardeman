import { mapActions } from 'vuex'

export default {
  data() {
    return {
      paypalScript: 'https://www.paypalobjects.com/api/checkout.js',
      paypalLoaded: false,
      paypalInitiated: false,
      hasPaypalButton: false,
      msg: '',
      billing: {
        firstName: null,
        lastName: null,
        address: null,
        city: null,
        state: '',
        postcode: null,
        country: 'NL',
        email: null,
        phone: null
      },
      shipping: {
        firstName: null,
        lastName: null,
        address: null,
        city: null,
        state: null,
        postcode: null,
        country: 'NL'
      },
      selectedCountry: 'NL',
      selectedZone: []
    }
  },
  methods: {
    ...mapActions([
      'ADD_TO_CART',
      'REMOVE_FROM_CART',
      'SET_CUSTOMER_INFO',
      'SET_SHIPPING',
      'PLACE_ORDER',
      'PAY_ORDER'
    ]),
    setShippingZone(event) {
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

      // set selectedZone
      if (byCountry !== undefined) {
        // try by country
        this.selectedZone = this.shop.shipping_zones.find(zone => zone.id === byCountry.id)
      } else if (byContinent !== undefined) {
        // try by continent
        this.selectedZone = this.shop.shipping_zones.find(zone => zone.id === byContinent.id)
      } else {
        // set to `other`
        this.selectedZone = this.shop.shipping_zones.find(zone => zone.id === 0)
      }
    },
    setShippingMethod(val) {
      this.SET_SHIPPING({
        method_id: val.method_id,
        method_title: val.method_title,
        total: val.settings.cost ? val.settings.cost.value : 0 // only charge money for rates with a cost
      })
    },
    paypalScriptLoaded() {
      this.paypalLoaded = true
    },
    pay() {
      //
      // this payment function does a couple of things.
      // 1. ADD_CUSTOMER INFO pushes the billing and shipping into an order object for the REST API, then
      // 2. PLACE_ORDER sends the order
      //
      this.msg = 'hold on, processing...'
      this.PLACE_ORDER(this.shop.order).then(() => {
        if (this.shop.payment.orderResponse.message) {
          this.msg = 'Something went wrong. Please try again or contact <a href="mailto:sales@hardeman.co">sales@hardeman.co</a>. Apologies for the inconvenience'
        } else {
          this.$router.push({ name: 'order-complete' })
        }
      })
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
            vm.PLACE_ORDER(vm.shop.order).then(() => {
              if (vm.shop.payment.orderResponse.message) {
                vm.msg = 'Something went wrong. Please contact <a href="mailto:sales@hardeman.co">sales@hardeman.co</a>. Our apologies for the inconvenience'
              } else {
                vm.$router.push({ name: 'order-complete' })
              }
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
          vm.msg = 'There was an error with Paypal. Please contact <a href="mailto:sales@hardeman.co">sales@hardeman.co</a>. Our apologies for the inconvenience.'
          return err
        }
      }, '#paypal-button')
    }
  }
}

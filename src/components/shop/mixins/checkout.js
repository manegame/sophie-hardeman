import { mapState, mapActions, mapGetters } from 'vuex'
// import { Card, createToken } from 'vue-stripe-elements'

export default {
  components: {
    // Card
  },
  data() {
    return {
      msg: '',
      billingComplete: false,
      complete: false,
      stripeOptions: {
        // see https://stripe.com/docs/stripe.js#element-options for details
        hidePostalCode: true,
        iconStyle: 'default'
      },
      token: '',
      sameAsBilling: true,
      missingBilling: [],
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
      selectedShippingMethod: 'flat_rate',
      shippingZone: [],
      shippingFee: 0
    }
  },
  computed: {
    ...mapState(['shop']),
    ...mapGetters({ shippingLoaded: 'shippingLoadedState', cartTotal: 'cartTotal' }),
    shippingTotal() {
      if (this.selectedShippingMethod === 'flat_rate') {
        if (this.shop.order.shipping_lines.length) {
          let total = 0
          this.shop.order.shipping_lines.map(line => {
            if (line.total) {
              total += Number(line.total)
            } else {
              total = 0
            }
          })
          return total
        } else return null
      } else return 0
    }
  },
  watch: {
    selectedShippingMethod() {
      this.setShippingMethod()
    },
    cartTotal(n) {
      this.setShippingMethod()
    },
    shippingLoaded(n) {
      if (n) {
        this.setShippingZone()
        this.setShippingInfo()
      }
    }
  },
  methods: {
    ...mapActions([
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
          if (this.cartTotal > floor && this.selectedShippingMethod !== 'local_pickup') {
            this.selectedShippingMethod = 'free_shipping'
          } else if (this.cartTotal < floor && this.selectedShippingMethod === 'free_shipping') {
            this.selectedShippingMethod = 'flat_rate'
          }
        }
        if (this.selectedShippingMethod === undefined || this.selectedShippingMethod === null) {
          this.selectedShippingMethod = 'flat_rate'
        }
        // check which shipping methods are available and handle them
        let shipMe = {}
        let method = this.shippingZone.methods.find(m => { return m.method_id === this.selectedShippingMethod })
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
    // pay() {
    //   //
    //   // this payment function does a couple of things.
    //   // 1. ADD_CUSTOMER INFO pushes the billing and shipping into an order object for the REST API, then
    //   // 2. PLACE_ORDER sends the order to the REST API, the orderResponse contains the id of the order
    //   // 3. createToken is a Stripe function which returns a token for payment
    //   // 4. PAY_ORDER sends the token and the order_id to our custom payment gateway and returns either a success or a failure
    //   //
    //   this.ADD_CUSTOMER_INFO({
    //     billing: this.billing,
    //     shipping: this.shipping
    //   }).then(() => {
    //     this.complete = false
    //     if (!this.billingComplete) {
    //       this.msg = 'please fill in the missing fields'
    //       return
    //     }
    //     this.msg = 'hold on, processing payment...'
    //     this.PLACE_ORDER(this.shop.order).then(() => {
    //       if (this.shop.payment.orderResponse.message) {
    //         this.msg = 'sorry, something went wrong. Please refresh and try again...'
    //       } else {
    //         createToken().then(result => {
    //           if (result.token) {
    //             let data = {
    //               order_id: this.shop.payment.orderResponse.id,
    //               payment_token: result.token.id,
    //               payment_method: 'stripe'
    //             }
    //             console.log('payment data', data)
    //             this.PAY_ORDER(data).then(() => {
    //               this.msg = this.shop.payment.progress.message
    //               if (this.shop.payment.progress.code === 200) {
    //                 // redirect user
    //                 this.$router.push({ name: 'order-complete' })
    //               } else if (this.shop.payment.progress.code === 401 || this.shop.payment.progress.code === 405) {
    //                 this.msg = this.shop.payment.progress.message
    //               }
    //             })
    //           } else {
    //             // no token
    //             this.msg = 'sorry, something went wrong. Please refresh and try again or email us.'
    //           }
    //         })
    //       }
    //     })
    //   })
    // }
    pay() {
      //
      // this payment function does a couple of things.
      // 1. ADD_CUSTOMER INFO pushes the billing and shipping into an order object for the REST API, then
      // 2. PLACE_ORDER sends the order to the REST API, the orderResponse contains the id of the order
      // 3. createToken is a Stripe function which returns a token for payment
      // 4. PAY_ORDER sends the token and the order_id to our custom payment gateway and returns either a success or a failure
      //
      this.ADD_CUSTOMER_INFO({
        billing: this.billing,
        shipping: this.shipping
      }).then(() => {
        this.complete = false
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
    }
  }
}

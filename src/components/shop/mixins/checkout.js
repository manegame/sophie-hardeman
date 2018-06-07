import { mapActions } from 'vuex'

export default {
  data() {
    return {
      complete: {
        billing: false,
        method: false
      },
      payBuddy: {
        script: 'https://www.paypalobjects.com/api/checkout.js',
        loaded: false,
        initiated: false
      },
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
      'SET_PAID',
      'PLACE_ORDER',
      'PAY_ORDER'
    ]),
    billingComplete(bool) {
      bool ? this.complete.billing = true : this.complete.billing = false
    },
    methodComplete(bool) {
      bool ? this.complete.method = true : this.complete.method = false
    },
    setShippingZone(event) {
      // sets the correct shipping zone
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

      // set selected method to nothing when changing zone
      this.selectedMethod = ''

      // set selectedZone
      if (byCountry !== undefined) {
        console.log('by country')
        // try by country
        this.selectedZone = this.shop.shipping_zones.find(zone => zone.id === byCountry.id)
      } else if (byContinent !== undefined) {
        console.log('by continent')
        // try by continent
        this.selectedZone = this.shop.shipping_zones.find(zone => zone.id === byContinent.id)
      } else {
        console.log('set to other')
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
    payBuddyLoadHandler() {
      this.payBuddy.loaded = true
      this.paypalInit()
    },
    // placePaidOrder() {
    //   //
    //   // this payment function does a couple of things.
    //   // 2. PLACE_ORDER sends the order
    //   //
    //   this.msg = 'hold on, processing...'
    //   if (this.orderComplete) {
    //     this.PLACE_ORDER(this.shop.order).then(() => {
    //       if (this.shop.payment.orderResponse.message) {
    //         this.msg = 'Something went wrong. Please contact <a href="mailto:sales@hardeman.co">sales@hardeman.co</a>. Apologies for the inconvenience'
    //       } else {
    //         this.$router.push({ name: 'order-complete' })
    //       }
    //     })
    //   }
    // },
    paypalInit() {
      console.log('initiate paypal')
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
          vm.msg = 'processing payment...'
          return actions.payment.execute().then(function(payment) {
            vm.SET_PAID({
              payment_method: 'paypal',
              set_paid: true
            })
            vm.PLACE_ORDER(vm.shop.order).then(() => {
              if (vm.shop.payment.orderResponse.message) {
                vm.msg = 'Something went wrong. Please contact <a href="mailto:sales@hardeman.co">sales@hardeman.co</a>. Our apologies for the inconvenience'
              } else {
                vm.$router.push({ name: 'order-complete' })
              }
            })
            vm.msg = ''
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

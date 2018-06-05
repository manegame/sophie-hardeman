import { mapState, mapGetters } from 'vuex'
import checkoutMethods from './methods'
import checkoutData from './data'

export default {
  mixins: [ checkoutData, checkoutMethods ],
  // IUFGDIUYGDIUYDG
  computed: {
    ...mapState(['main', 'shop']),
    ...mapGetters({
      shippingLoaded: 'shippingLoadedState',
      cartTotal: 'cartTotal',
      shippingTotal: 'shippingTotal'
    }),
    total() {
      return this.cartTotal + this.shippingTotal
    }
  },
  watch: {
    selectedMethod() {
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
  mounted() {
    console.log('mounted hook')
    // paypal
    if (this.shop.cart.length > 0) {
      let paypal = document.createElement('script')
      paypal.setAttribute('src', this.paypalScript)
      paypal.addEventListener('load', this.paypalScriptLoaded)
      document.head.appendChild(paypal)
    }
  }
}

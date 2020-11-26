import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['shopify']),
    totalItems () {
      if (this.shopify.checkout && this.shopify.checkout.lineItems.length > 0) {
        return this.shopify.checkout.lineItems.map(item => item.quantity).reduce((total, item) => total + item)
      }
      return 0
    }
  },
  methods: {
    priceRange (product) {
      if (product.variants.length > 1) {
        let p = product.variants.map((vr) => {
          return Number.parseFloat(vr.priceV2.amount)
        })
        const u = new Set(p)
        const prizes = [...u]
        return this.$options.filters.dollify(product.variants[0].priceV2.currencyCode) + Math.min(prizes)
      } else {
        return this.$options.filters.dollify(product.variants[0].priceV2.currencyCode) + product.variants[0].priceV2.amount
      }
    }
  }
}

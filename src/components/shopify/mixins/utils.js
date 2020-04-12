import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['shopify'])
  },
  methods: {
    priceRange (id) {
      const product = this.shopify.products.find((pr) => {
        return pr.id === id
      })

      if (product.variants.length > 1) {
        let p = product.variants.map((vr) => {
          return Number.parseFloat(vr.priceV2.amount)
        })
        const u = new Set(p)
        const prizes = [...u]
        return 'Starting from ' + product.variants[0].priceV2.currencyCode + ' ' + Math.min(prizes)
      } else {
        return product.variants[0].priceV2.currencyCode + ' ' + product.variants[0].priceV2.amount
      }
    }
  }
}

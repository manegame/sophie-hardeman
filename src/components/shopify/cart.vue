<template>
  <section class="cart">
    <router-link :to="-1">
      Close
    </router-link>
    <div class="col">
      <h1>Shoppin cart</h1>
      <cart-item v-for="item in shopify.checkout.lineItems" :item="item" :key="item.id" />
    </div>
    <div class="col">
      <totals />
      <p>Ur shopping bag: {{shopify.checkout.currencyCode}} {{shopify.checkout.paymentDue}}</p>
      <a v-if="shopify.checkout.webUrl && totalItems" :href="shopify.checkout.webUrl" class="button">Go to checkout</a>
    </div>
  </section>
</template>

<script>
import cartItem from '@/components/shopify/cart-item'
import totals from '@/components/shopify/totals'
import utils from '@/components/shopify/mixins/utils'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Cart',
  components: {
    totals,
    cartItem
  },
  mixins: [utils],
  data () {
    return {
      cartVisible: false
    }
  },
  methods: {
    ...mapActions([
      'ADD_LINE_ITEMS'
    ])
  },
  computed: {
    ...mapState(['shopify'])
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/_variables.scss';

.cart {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background: #fff;
  display: flex;

  .col {
    width: 50%;
  }
}

.button {
  line-height: 20px;
  padding: 0px 8px;
  border: $border;
  height: 100%;
  &:hover {
    font-weight: bold;
    background: $yellow;
  }
}
</style>
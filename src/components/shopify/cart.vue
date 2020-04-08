<template>
  <section class="cart">
    <strong v-if="shopify.checkout">({{ totalItems }}) items in cart</strong>
    <span class="button" @click="cartVisible = true">Show cart</span>

    <div class="inner" v-if="cartVisible">
      <div class="col">
        <h1 @click="cartVisible = false">Shoppin cart</h1>
        <cart-item v-for="item in shopify.checkout.lineItems" :item="item" :key="item.id" />
      </div>
      <div class="col">
        <totals />
        <p>Ur shopping bag: {{shopify.checkout.currencyCode}} {{shopify.checkout.paymentDue}}</p>
        <a v-if="shopify.checkout.webUrl" :href="shopify.checkout.webUrl" class="button">Go to checkout</a>
      </div>
    </div>

    <a v-if="shopify.checkout.webUrl" :href="shopify.checkout.webUrl" class="button">Direct checkout</a>
  </section>
</template>

<script>
import cartItem from '@/components/shopify/cart-item'
import totals from '@/components/shopify/totals'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Cart',
  components: {
    totals,
    cartItem
  },
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
    ...mapState(['shopify']),
    totalItems () {
      return this.shopify.checkout.lineItems.map(item => item.quantity).reduce((total, item) => total + item)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/_variables.scss';

.cart {
  line-height: 20px;

  .inner {
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
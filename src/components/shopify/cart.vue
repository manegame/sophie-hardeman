<template>
  <section class="cart">
    <strong v-if="shopify.checkout">({{ shopify.checkout.lineItems.length }}) items in cart</strong>
    <span class="button">Show cart</span>
    <a v-if="shopify.checkout.webUrl" :href="shopify.checkout.webUrl" class="button">Direct checkout</a>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Cart',
  methods: {
    ...mapActions([
      'GET_CHECKOUT'
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
  line-height: 20px;
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
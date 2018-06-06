<template>
  <fieldset class="totals">
    <legend class="totals__legend">Order</legend>
    <ul class="totals__list">
      <li class="totals__list__item naturel" 
          v-for='item in shop.cart'
          v-if='item.data.variation'
          :key='"listVar" + item.data.variation.id'>
        <span v-html='item.quantity + " x " + item.data.product.name + " (" + item.data.variation.attributes[0].option + "): €" + item.data.variation.price' />
      </li>
      <li v-else
          :key='"listSim" + item.data.product.id'>
      <span v-html='item.quantity + " x " + item.data.product.name + " €" + item.data.product.price' />
      </li>
    </ul>
    <ul class="totals__list" v-if='shippingTotal !== null'>
      <li class="totals__list__item naturel">
        Shipping: €{{shippingTotal}}
      </li>
    </ul>
      Grand Total: €{{cartTotal + shippingTotal}} (VAT incl.)
  </fieldset>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'totals',
  computed: {
    ...mapState(['shop']),
    ...mapGetters(['cartTotal', 'shippingTotal'])
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/_variables.scss';

.totals {
  border: $border;
  max-width: $left-col-width;
  margin-top: 10px;
  padding: 8px 28px;
  background: $yellow;

  &__legend {
    margin-left: -20px;
  }

  &__list {
    list-style-type: disc;
    padding-bottom: 8px;
    margin-bottom: 8px;
    border-bottom: $border;

    &__item {
      color: $black;
    }
  }
}
</style>

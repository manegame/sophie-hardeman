<template>
  <fieldset class="totals">
    <legend class="totals__legend">Order</legend>
    <ul class="totals__list">
      <li class="totals__list__item naturel" 
          v-for='(item, index) in shop.cart'
          v-if='item.data.variation'
          :key='"listVar" + index'>
        <span v-html='item.quantity + " x " + item.data.product.name' />
        <span v-for='attr in item.attributes'
              :key='attr.key'
              v-html='"(" + attr.value + ") "' />
        <span v-html='shop[shop.currency.value] + item.data.variation.price + ""' />
      </li>
      <li v-else
          :key='"listSim" + index'>
        <span v-html='item.quantity + " x " + item.data.product.name' />
        <span v-for='attr in item.attributes'
              :key='attr.key'
              v-html='"(" + attr.value + ") "' />
        <span v-html='shop[shop.currency.value] + item.data.product.price + ""' />
      </li>
    </ul>
    <ul class="totals__list" v-if='shippingTotal !== null'>
      <li class="totals__list__item naturel">
        Shipping: {{shop[shop.currency.value]}}{{shippingTotal}}
      </li>
    </ul>
      Grand Total: {{shop[shop.currency.value]}}{{cartTotal + shippingTotal}} (VAT incl.)
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

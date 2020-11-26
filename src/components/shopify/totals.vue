<template>
  <fieldset class="totals">
    <legend class="totals__legend">Order</legend>
    <ul v-if="shopify.checkout.lineItems.length > 0" class="totals__list">
      <li class="totals__list__item naturel" 
          v-for='(item, index) in shopify.checkout.lineItems'
          :key='"listVar" + index'>
          <span v-if='item.variant'>
            <span v-html='item.quantity + " x " + item.title' />
            <span v-for='attr in item.attributes'
                  :key='attr.key'
                  v-html='"(" + attr.value + ") "' />
            <span>
              {{ shopify.checkout.currencyCode | dollify }}{{ item.variant.price }}
            </span>
          </span>
          <span v-else>
            <span v-html='item.quantity + " x " + item.title' />
            <span v-for='attr in item.attributes'
                  :key='attr.key'
                  v-html='"(" + attr.value + ") "' />
            <span>
              {{ shopify.checkout.currencyCode | dollify }}{{ item.price }}
            </span>
          </span>
      </li>
    </ul>
    <ul v-else class="totals__list">
      <li class="totals__list__item naturel" >
        Nothing here...
      </li>
    </ul>
      Grand Total: {{ shopify.checkout.currencyCode | dollify }} {{ shopify.checkout.paymentDue }} (VAT incl.)
  </fieldset>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'totals',
  computed: {
    ...mapState(['shopify'])
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

<template>
  <section class="cart" @click.self="$router.go(-1)">
    <div class="inner">
      <div class="head">
        <h1>shopping cart</h1>
        <h1 @click.prevent="$router.go(-1)">
          x
        </h1>
      </div>

      <div class="scroll">
        <div class="col left">
          <cart-item v-for="item in shopify.checkout.lineItems" :item="item" :key="item.id" />
        </div>
        <div class="col right sticky">
          <totals class="block" />
          <p class="block">Your shopping bag: {{shopify.checkout.currencyCode}} {{shopify.checkout.paymentDue}}</p>
        </div>
      </div>

      <div class="checkout">
        <a v-if="shopify.checkout.webUrl && totalItems" :href="shopify.checkout.webUrl" class="button checkout">Check out</a>
      </div>
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
  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;

  .inner {
    position: fixed;
    top: 20px;
    left: 20px;
    width: calc(100vw - 40px);
    height: calc(#{$exact-height} - #{$footer-height});
    background: $white;
    border: $border;
    overflow: hidden;

    .head {
      position: sticky;
      z-index: 9999;
      top: 0;
      width: 100%;
      background: $white;
      height: 60px;
      padding: 0 20px;
      border-bottom: $border;
      display: flex;
      justify-content: space-between;
    }

    .checkout {
      position: absolute;
      bottom: 0;
      width: 100%;
      background: $yellow;
      border-top: $border;
      line-height: 40px;
      font-weight: bold;

      &:hover {
        text-decoration: underline;
      }

      &:active {
        background:$white;
      }
    }

    .scroll {
      width: 100%;
      height: 100%;
      padding: 20px 0;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      align-items: flex-start;
      padding: 0 20px 80px;
      overflow-y: scroll;

      .col {
        padding: 20px 0;
        margin-bottom: 0;

        &.left {
          flex-basis: 740px;
          flex-grow: 10;
          display: flex;
          flex-flow: row wrap;
        }

        &.right {
          flex-grow: 1;

          .block {
            margin-bottom: 20px;
            margin-top: -10px;
          }
        }

        &.sticky {
          position: sticky;
          top: 0;
        }

        &.full {
          width: 100%;
        }
      }
    }
  }
}

.button {
  &.checkout {
    width: 100%;
    text-align: center;
    height: 40px;
  }
}
</style>
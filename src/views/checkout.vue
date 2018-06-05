<template>
  <div class='checkout'>

    <navbar />
    <topbar />

    <!-- BEGIN CHECKOUT -->
    <div  class="checkout__main"
          v-if='shop.cart.length > 0'>
      <div class="checkout__main__left">
        <cart-item  v-for='item in shop.cart'
                    :item='item'
                    :key='item.data.id' />
      </div>

      <!-- BEGIN RIGHT COL -->
      <div class="checkout__main__right">

        <!-- FORM -->
        <form @submit.prevent='pay' 
              @change=' validate(); 
                        setShippingInfo($event); 
                        setShippingZone($event)'>
          <!-- SHIPPING AND BILLING INFO -->
          <billing-shipping :billingData='billing'
                            :shippingData='shipping' />

          <!-- SHIPPING METHODS -->
          <shipping-method  :shippingZone='shippingZone'
                            :selectedMethod='selectedMethod'
                            @change='setShippingMethod($event)' />

          <totals />
          <!-- START PAYMENT -->
          <fieldset id='payment' 
                    :class='{"incomplete": !billingComplete}'>
            <legend>Payment</legend>
            <div id="paypal-button"></div>
          </fieldset>
          <!-- END PAYMENT -->
          <!-- MESSAGE TO USER -->
          <p id='message' v-html='msg' />
          <!-- END MESSAGE TO USER -->
          </form>
      </div>
    </div>

    <div class="checkout__main" v-else>
      <div class="checkout__main__left">
        It seems there is nothing to check out.<br/>
        <router-link :to='{ name: "landing" }'>Home</router-link>
      </div>
      <div class="checkout__main__right">
        <!--  -->
      </div>
    </div>
  </div>
</template>

<script>
import checkout from '@/components/shop/mixins/checkout'

import navbar from '@/components/navbar'
import topbar from '@/components/topbar'

import cartItem from '@/components/shop/cart-item'
import billingShipping from '@/components/shop/billing-shipping'
import shippingMethod from '@/components/shop/shipping-method'
import totals from '@/components/shop/totals'

export default {
  name: 'checkout',
  components: {
    navbar,
    topbar,
    cartItem,
    billingShipping,
    shippingMethod,
    totals
  },
  mixins: [checkout]
}
</script>


<style lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';
@import '../style/_forms.scss';

.incomplete {
  opacity: 0.7;
  pointer-events: none;
}

.checkout {
  @include single;

  &__main {
    position: relative;
    clear: none;

    &__left {
      width: $left-col-width;
      min-width: $left-col-width;
      float: left;
      display: block;
      padding-bottom: $topbar-height * 3;

      @include screen-size('small') {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
        padding-bottom: 0;
      }
    }

    &__right {
      @include right-col;
      float: right;
      font-size: $font-size;
      line-height: $line-height;
      padding-bottom: 80px;
      padding-left: 20px;

      &__title {
        color: $black;
      }

      @include screen-size('small') {
        padding-left: 0;
      }

    }
  }
}
</style>
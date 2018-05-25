<template>
  <div class='checkout'>
    <navbar />
    <topbar />
    <div class="checkout__main"
         v-if='shop.cart.length > 0'>
         <!-- START LEFT COL -->
         <div class="checkout__main__left">
            <div class='checkout__main__left__item'
                 v-for='item in shop.cart'
                 :key='item.data.id'>
                  <span class="checkout__main__left__item__amount">
                    {{item.quantity}} x
                    <button v-if='item.quantity === 1' @click='ADD_TO_CART(item.data)'>one more?</button>
                    <button v-if='item.quantity === 2' @click='ADD_TO_CART(item.data)'>mmmm yeah..</button>
                    <button v-if='item.quantity === 3' @click='ADD_TO_CART(item.data)'>more!</button>
                    <button v-if='item.quantity === 4' @click='ADD_TO_CART(item.data)'>more!!!</button>
                    <button v-if='item.quantity === 5' @click='ADD_TO_CART(item.data)'>please, I'm begging you</button>
                 </span>
                 <img class='checkout__main__left__item__image' 
                      v-if='!item.data.variation' 
                      :src='item.data.product.acf.image.sizes["s-h-small"]' />
                 <img class='checkout__main__left__item__image' 
                      v-else
                      :src='item.data.variation.image.src' />
                 <div class="checkout__main__left__item__meta">
                    <h6>
                      <span class='checkout__main__left__item__meta__season' v-html='item.data.product.acf.season'></span>
                      <template v-if='item.data.variation'>
                        <span class="checkout__main__left__item__meta__title">{{item.data.product.name}} ({{item.data.variation.attributes[0].option}})</span>
                        <span class="checkout__main__left__item__meta__price">{{item.data.variation.price}}</span><br>
                      </template>
                      <template v-else>
                        <span class="checkout__main__left__item__meta__title">{{item.data.product.name}}</span>
                        <span class="checkout__main__left__item__meta__price">{{item.data.product.price}}</span><br>
                      </template>
                    </h6>
                  </div>
            </div>
         </div>
         <!-- END LEFT COL -->
         <div class="checkout__main__right">
          <!-- BEGIN FORM -->
          <form @submit.prevent='pay' @change='validate(); setShippingInfo($event); setShippingZone($event)'>
            <!-- START BILLING -->
            <fieldset id='billing'>
              <legend>Billing Information</legend>
              <input type="text"
                    placeholder='first name'
                    v-model='billing.firstName'/><br />
              <input type="text"
                    placeholder='last name'
                    v-model='billing.lastName'/><br />
              <input type="text"
                    placeholder='address'
                    v-model='billing.address'/><br />
              <input type="text"
                    placeholder='city'
                    v-model='billing.city'/><br />
              <input type="text"
                    placeholder='state'
                    v-model='billing.state'/><br />
              <input type="text"
                    placeholder='postcode'
                    v-model='billing.postcode'/><br />
              <select v-model='billing.country'>
                <option v-for='country in shop.countryList' 
                        :value='country[1]'
                        :key='"billing-"+country[1]+"-"+country[3]'
                        v-html='country[4]' />
              </select><br>
              <input type="text"
                    placeholder='email'
                    v-model='billing.email'/>
              <input type="text"
                    placeholder='phone'
                    v-model='billing.phone'/>
            </fieldset>
            <!-- END BILLING -->
            <loader v-if='!shop.shippingLoaded' />
            <!-- START SHIPPING -->
            <fieldset id='shipping' v-else>
              <legend>Shipping</legend>
              <input type="checkbox" v-model='sameAsBilling' /><label>Ship to billing address</label><br>
              <template v-if='!sameAsBilling'>
                <input type="text"
                        placeholder='first name'
                        v-model='shipping.firstName'/><br />
                <input type="text"
                        placeholder='last name'
                        v-model='shipping.lastName'/><br />
                <input type="text"
                        placeholder='address'
                        v-model='shipping.address'/><br />
                <input type="text"
                        placeholder='city'
                        v-model='shipping.city'/><br />
                <input type="text"
                        placeholder='state'
                        v-model='shipping.state'/><br />
                <input type="text"
                        placeholder='postcode'
                        v-model='shipping.postcode'/><br />
              <select v-model='shipping.country'>
                <option v-for='country in shop.countryList' 
                        :value='country[1]'
                        :key='"shipping-"+country[1]+"-"+country[3]'
                        v-html='country[4]' />
              </select><br>
              </template>
              <!-- START SHIPPING METHODS -->
              <fieldset v-if='shippingZone !== null' 
                        @change='setShippingMethod($event)'
                        id='shipping_methods'>
                Shipping zone: {{shippingZone.name}} <br/>
                <template v-for='(method, index) in shippingZone.methods'>
                  <!-- Flat Rate -->
                  <template v-if='method.method_id === "flat_rate"'>
                    <input type='radio' 
                            :id='index' 
                            :value='method.method_id' 
                            v-model='selectedShippingMethod' 
                            :key='index'/>
                    <label :key='"fl-" + index' 
                            v-html='method.method_title' />
                    €{{method.settings.cost.value}}
                  </template>
                  <!-- Local Pickup -->
                  <template v-if='method.method_id === "local_pickup"'>
                    <input type='radio' 
                            :id='index' 
                            :value='method.method_id'
                            v-model='selectedShippingMethod' 
                            :key='index'/>
                    <label :key='"lp-" + index' 
                            v-html='method.method_title' />
                  </template>
                  <!-- Free Shipping -->
                  <template v-if='method.method_id === "free_shipping"'>
                    <input type='radio' 
                            :id='index' 
                            :value='method.method_id'
                            :disabled='cartTotal < method.settings.min_amount.value'
                            v-model='selectedShippingMethod' 
                            :key='index'/>
                    <label :key='"fs-" + index' 
                            v-html='method.method_title' />
                    for orders above €{{method.settings.min_amount.value}}
                  </template>
                </template>
              </fieldset>
              <!-- END SHIPPING METHODS -->
            </fieldset>
            <!-- END SHIPPING -->
            <fieldset class="checkout__main__right__totals">
              <legend class="checkout__main__right__totals__legend">Order</legend>
              <ul class="checkout__main__right__totals__list">
                <li class="checkout__main__right__totals__list__item naturel" 
                    v-for='item in shop.cart'
                    v-if='item.data.variation'
                    :key='"list" + item.data.variation.id'>
                  <span>
                    {{item.quantity}} x {{item.data.product.name}} ({{item.data.variation.attributes[0].option}}): €{{item.data.variation.price}}
                  </span>
                </li>
                <li v-else
                    :key='"list" + item.data.product.id'>
                  <span>
                    {{item.quantity}} x {{item.data.product.name}}: €{{item.data.product.price}}
                  </span>
                </li>
              </ul>
              <ul class="checkout__main__right__totals__list" v-if='shippingTotal !== null'>
                <li class="checkout__main__right__totals__list__item naturel">
                  Shipping: €{{shippingTotal}}
                </li>
              </ul>
                Grand Total: €{{cartTotal + shippingTotal}} (VAT incl.)
            </fieldset>
            <!-- START PAYMENT -->
            <fieldset id='payment' 
                      :class='{"incomplete": !billingComplete}'>
              <legend>Payment</legend>
              <!-- <card class='stripe-card'
                    :class='{ complete }'
                    :stripe='stripeKey'
                    :options='stripeOptions'
                    @change='complete = $event.complete'/>
                <input class='pay-with-stripe' type='submit' value='Pay with credit card' :disabled='!complete'> -->
                <div id="paypal-button"></div>
            </fieldset>
            <fieldset id='payment'>
              <input type='submit' value='PRE-ORDER'>
            </fieldset>
            <!-- END PAYMENT -->
            <!-- MESSAGE TO USER -->
            <p id='message' v-html='msg' />
            <!-- END MESSAGE TO USER -->
          </form>
          <!-- END FORM -->
        </div>
    </div>
    <div class="checkout__main" v-else>
      <div class="checkout__main__left">
        <randomImage/>
      </div>
      <div class="checkout__main__right">
        It seems there is nothing to check out.<br/>
        <router-link :to='{name: "landing"}'>
          Go home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'
import loader from '@/components/base/loader'
import navbar from '@/components/navbar'
import topbar from '@/components/topbar'
import randomImage from '@/components/random-image'
import checkout from '@/components/shop/mixins/checkout'

export default {
  name: 'checkout',
  components: { loader, navbar, topbar, randomImage },
  mixins: [checkout],
  data() {
    return {
      // stripeKey: 'pk_live_cF6ffZbXqoMaxvXr8ZPXI0J9'
      paypalScript: 'https://www.paypalobjects.com/api/checkout.js',
      paypalLoaded: false
    }
  },
  computed: {
    ...mapState(['main', 'shop']),
    ...mapGetters(['cartTotal', 'shippingTotal']),
    total() {
      return this.cartTotal + this.shippingTotal
    }
  },
  mounted() {
    this.setShippingZone()
    // paypal
    let paypal = document.createElement('script')
    paypal.setAttribute('src', this.paypalScript)
    paypal.addEventListener('load', this.paypalScriptLoaded)
    document.head.appendChild(paypal)
  },
  methods: {
    ...mapActions([
      'ADD_TO_CART',
      'REMOVE_FROM_CART',
      'ADD_CUSTOMER_INFO',
      'PLACE_ORDER'
    ]),
    paypalScriptLoaded() {
      console.log('paypal has loaded')
      this.paypalLoaded = true
      this.paypalInit()
    },
    paypalInit() {
      console.log('paypal init')
      const vm = this
      paypal.Button.render({
        env: 'sandbox', // Or 'sandbox',

        commit: true, // Show a 'Pay Now' button

        // PayPal Client IDs - replace with your own
        // Create a PayPal app: https://developer.paypal.com/developer/applications/create
        client: {
            sandbox:    'ARxqTmcXElXkbqbdVOKiK_Icq0mdRimros412LhoCZUwPtutl05ab9qoNVP96F0jGw8JjW5LpPYW4FsA',
            production: '<insert production client id>'
        },

        style: {
          color: 'gold',
          size: 'small'
        },

        payment: function(data, actions) {
          return actions.payment.create({
              payment: {
                  transactions: [
                      {
                          amount: { total: '' + vm.total + '', currency: 'EUR' }
                      }
                  ]
              }
          })
        },

        onAuthorize: function(data, actions) {
          return actions.payment.execute().then(function(payment) {
            vm.shop.order.payment_method = 'paypal'
            vm.shop.order.set_paid = true
            vm.ADD_CUSTOMER_INFO({
              billing: vm.billing,
              shipping: vm.shipping
            }).then(() => {
              vm.PLACE_ORDER(vm.shop.order).then(() => {
                if (vm.shop.payment.orderResponse.message) {
                  vm.msg = 'Something went wrong. Please try again or contact <a href="mailto:sales@hardeman.co">sales@hardeman.co</a>. Apologies for the inconvenience'
                } else {
                  vm.$router.push({ name: 'order-complete' })
                }
              })
            })
            // The payment is complete!
            // You can now show a confirmation message to the customer
          })
        },

        onCancel: function(data, actions) {
          /*
          * Buyer cancelled the payment
          */
        },

        onError: function(err) {
          /*
          * An error occurred during the transaction
          */
        }
      }, '#paypal-button')
    }
  }
}
</script>


<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

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

      &__item {
        width: $left-col-width;
        height: $left-col-width;
        border-radius: 8px;
        margin-right: 20px;
        margin-bottom: 30px;
        border: 1px solid $grey-darker;
        overflow: hidden;
        position: relative;

        &__amount {
          background: $white;
          position: absolute;
          left: 0;
          font-family: $sans-serif-stack;
          font-size: $font-size;
          line-height: 100%;
          color: $orange;
          padding: 4px 6px;
          border-radius: 6px 0 6px 0;
          border-bottom: 1px solid $grey-darker;
          border-right: 1px solid $grey-darker;
        }

        &__image {
          z-index: 6;
          width: 100%;
          display: block;
          height: calc(100% - 60px);
          object-fit: contain;
          object-position: top center;
        }

        &__meta {
          border-top: 1px solid $grey-darker;
          padding: 8px 20px;
          height: 60px;

          &__season {
            color: $grey-darker;

            &::before {
              content: '\2605';
              margin-right: 4px;
            }
          }

          &__title {
            color: $blue;
          }

          &__price {
            font-family: $sans-serif-stack;
            font-size: $font-size;
            line-height: 100%;
            color: $orange;
            padding: 2px 6px;
            border-radius: 6px;
            border: 1px solid $grey-dark;

            &::after {
              content: " €"
            }
          }

          &__brackets {
            font-family: sans-serif;
            font-size: $font-size-s;
          }
        }
      }
    }

    &__right {
      @include right-col;
      float: right;
      font-size: $font-size;
      line-height: $line-height;
      padding-bottom: 80px;

      @include screen-size('small') {
        padding-bottom: 80px;
      }

      &__totals {
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

      &__title {
        color: $black;
      }
    }
  }
}

form input,
select {
  font-size: $font-size-s;
  line-height: $line-height;
  margin-bottom: 4px;
}

input,
select {
  width: 100%;
  padding: 0 4px;
}

input[type='radio'],
input[type='checkbox'] {
  width: auto;
  padding: 0;
}

input[placeholder='phone'],
input[placeholder='email'] {
  width: calc(50% - 4px);
}

#billing,
#payment,
#shipping {
  border: $border;
  max-width: $left-col-width * 1.5;
  padding: 8px;

  &:first-child {
    margin-top: -10px;
  }
}

#payment,
#shipping,
#message {
  margin-top: 10px;
}

#message {
  color: $orange;
}

.pay-with-stripe {
  color: $black;
  margin-top: 8px;
}

input[type='submit'] {
  &:disabled {
    opacity: 0.6;

    &:hover {
      background-color: $white;
    }
  }
}

</style>
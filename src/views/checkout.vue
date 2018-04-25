<template>
  <div class='checkout'>
    <navbar />
    <topbar />
    <div class="checkout__main"
         v-if='shop.cart.length'>
         <div class="checkout__main__left">
            <div class='checkout__main__left__item'
                 v-for='item in shop.cart'
                 :key='item.data.id'>
                 <!-- PRICE -->
                  <template v-if='item.data.variation'>
                    {{item.data.product.name}}<span>({{item.data.variation.attributes[0].option}})</span>
                    <span>€{{item.data.variation.price}}</span><br>
                  </template>
                  <template v-else>
                    {{item.data.product.name}} <span>€{{item.data.product.price}}</span><br>
                  </template>
                  amount: 
                  <button @click='ADD_TO_CART(item.data)'>+</button>
                  <span>{{item.quantity}}</span>
                  <button @click='REMOVE_FROM_CART(item.data)'>-</button>
            </div>
            total: €{{cartTotal}}
         </div>
         <div class="checkout__main__right">
          <!-- BEGIN FORM -->
          <form @submit.prevent='pay' @change='validate(); setShippingInfo($event); setShippingZone($event)'>
            <!-- START BILLING -->
            <fieldset id='billing'>
              <legend>Billing</legend>
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
              <input type="checkbox" v-model='sameAsBilling' /><label>Use the same address</label><br>
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
            <!-- START PAYMENT -->
            <fieldset id='payment'>
              <legend>Payment</legend>
              <card class='stripe-card'
                    :class='{ complete }'
                    :stripe='stripeKey'
                    :options='stripeOptions'
                    @change='complete = $event.complete'/>
                <input class='pay-with-stripe' type='submit' value='Pay with credit card' :disabled='!complete'>
            </fieldset>
            <!-- END PAYMENT -->
          </form>
          <!-- END FORM -->
        </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import loader from '@/components/base/loader'
import navbar from '@/components/navbar'
import topbar from '@/components/topbar'
import checkout from '@/components/shop/mixins/checkout'

export default {
  name: 'checkout',
  components: { loader, navbar, topbar },
  mixins: [checkout],
  data() {
    return {
      stripeKey: 'pk_test_fg0ori4rYbDDv2EmQqo5eWOo'
    }
  },
  computed: {
    ...mapState(['main', 'shop'])
  },
  mounted() {
    this.setShippingZone()
  },
  methods: {
    ...mapActions([
      'ADD_TO_CART',
      'REMOVE_FROM_CART'
    ])
  }
}
</script>


<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.checkout {
  @include single;

  &__main {
    position: relative;
    clear: none;

    &__left {
      width: $left-col-width;
      float: left;

      @include screen-size('small') {
        width: 100%;
      }

      &__image {
        width: 100%;
        height: auto;
      }
    }

    &__right {
      @include right-col;

      &__title {
        color: $black;
      }
    }
  }
}

</style>
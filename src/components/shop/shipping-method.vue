<template>
  <fieldset id='shipping_method'
            v-if='shippingZone !== null'>
    <legend>Shipping Method</legend>
    Shipping zone: {{shippingZone.name}} 
    <br/>
    <template v-for='(method, index) in shippingZone.methods'>
      <!-- Flat Rate -->
      <template v-if='method.method_id === "flat_rate"'>
        <input  type='radio' 
                :id='index' 
                :value='method.method_id'
                v-model='shippingMethod'
                :key='index'/>
        <label :key='"fl-" + index' 
                v-html='method.method_title' />
        €{{method.settings.cost.value}}
      </template>
      <!-- Local Pickup -->
      <template v-if='method.method_id === "local_pickup"'>
        <input  type='radio' 
                :id='index' 
                :value='method.method_id'
                v-model='shippingMethod'
                :key='index'/>
        <label :key='"lp-" + index' 
                v-html='method.method_title' />
      </template>
      <!-- Free Shipping -->
      <template v-if='method.method_id === "free_shipping"'>
        <input  type='radio' 
                :id='index' 
                :value='method.method_id'
                :disabled='cartTotal < method.settings.min_amount.value'
                v-model='shippingMethod'
                :key='index'/>
        <label  :key='"fs-" + index' 
                v-html='method.method_title' />
        <span :key='"msg" + index' 
              v-html='"for orders above €" + method.settings.min_amount.value' />
      </template>
    </template>
  </fieldset>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'shipping-method',
  props: {
    shippingZone: {
      type: [ Array, Object ],
      required: true
    },
    selectedMethod: {
      type: [ String ],
      required: true
    }
  },
  computed: {
    ...mapGetters(['cartTotal']),
    shippingMethod() {
      return this.selectedMethod
    }
  }
}
</script>
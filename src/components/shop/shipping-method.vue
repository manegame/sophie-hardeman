<template>
  <fieldset id='shipping_method'>
    <legend>Shipping Method</legend>
    Shipping zone: {{shippingZone.name}}
    <br/>
    <template v-for='(method, index) in shippingZone.methods'>
      <!-- Flat Rate -->
        <input  type='radio' 
                :id='method.method_id' 
                :value='method'
                :disabled='method.settings.min_amount && cartTotal < Number(method.settings.min_amount.value)'
                v-model='selectedMethod'
                :key='index'/>
        <label :key='"fl-" + index' 
                v-html='method.method_title' />
        <span v-if='method.settings.cost'
              :key='"euro" + index'
              v-html='method.settings.cost.value ? "€" + method.settings.cost.value : "free"' />
    </template>
  </fieldset>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'shipping-method',
  data() {
    return {
      selectedMethod: ''
    }
  },
  props: {
    selectedZone: {
      type: [ Array, Object ],
      required: true
    }
  },
  computed: {
    ...mapGetters(['cartTotal']),
    shippingZone() {
      return this.selectedZone
    }
  },
  watch: {
    selectedMethod(val) {
      this.$emit('shippingMethodChange', val)
    },
    shippingZone(val) {
      console.log('zone changed', val)
    }
  }
}
</script>
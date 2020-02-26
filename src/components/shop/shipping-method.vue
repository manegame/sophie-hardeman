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
              v-html='method.settings.cost.value ? shop[shop.currency.value] + method.settings.cost.value : "free"' />
    </template>
  </fieldset>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'shipping-method',
  data() {
    return {
      selectedMethod: '',
      shippingZone: this.selectedZone
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
    ...mapState(['shop'])
  },
  watch: {
    selectedMethod(val) {
      val !== null || val !== '' ? this.$emit('complete', true) : this.$emit('complete', false)
      this.$emit('shippingMethodChange', val)
    },
    selectedZone(val) {
      this.shippingZone = val
    }
  }
}
</script>
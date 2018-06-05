<template>
  <div>         
    <fieldset id='billing'>
      <legend>Billing Information</legend>
      <input type="text"
            placeholder='first name'
            v-model='billingData.firstName'/><br />
      <input type="text"
            placeholder='last name'
            v-model='billingData.lastName'/><br />
      <input type="text"
            placeholder='address'
            v-model='billingData.address'/><br />
      <input type="text"
            placeholder='city'
            v-model='billingData.city'/><br />
      <input type="text"
            placeholder='state'
            v-model='billingData.state'/><br />
      <input type="text"
          placeholder='postcode'
            v-model='billingData.postcode'/><br />
      <select v-model='billingData.country'>
        <option v-for='country in shop.countryList' 
                :value='country[1]'
                :key='"billing-"+country[1]+"-"+country[3]'
                v-html='country[4]' />
      </select><br>
      <input type="text"
            placeholder='email'
            v-model='billingData.email'/>
      <input type="text"
            placeholder='phone'
            v-model='billingData.phone'/>
    </fieldset>

    <!-- START SHIPPING -->
    <loader v-if='!shop.shippingLoaded' />
    <fieldset id='shipping'
              v-else>
      <legend>Shipping Information</legend>
      <input  type="checkbox" 
              v-model='sameAsBilling' />
      <label>Ship to billing address</label>
      <br>
      <template v-if='!sameAsBilling'>
        <input  type="text"
                placeholder='first name'
                v-model='shippingData.firstName'/>
        <br />
        <input  type="text"
                placeholder='last name'
                v-model='shippingData.lastName'/>
        <br />
        <input  type="text"
                placeholder='address'
                v-model='shippingData.address'/>
        <br />
        <input  type="text"
                placeholder='city'
                v-model='shippingData.city'/>
        <br />
        <input  type="text"
                placeholder='state'
                v-model='shippingData.state'/>
        <br />
        <input  type="text"
                placeholder='postcode'
                v-model='shippingData.postcode'/>
        <br />
        <select v-model='shippingData.country'>
          <option v-for='country in shop.countryList' 
                  :value='country[1]'
                  :key='"shipping-"+country[1]+"-"+country[3]'
                  v-html='country[4]' />
        </select>
        <br>
      </template>
    </fieldset>
  </div>
</template>

<script>
import loader from '@/components/base/loader'
import { mapState } from 'vuex'

export default {
  name: 'billing-shipping',
  components: [ loader ],
  data() {
    return {
      sameAsBilling: true
    }
  },
  props: {
    billingData: {
      type: Object,
      required: true
    },
    shippingData: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['shop'])
  }
}
</script>


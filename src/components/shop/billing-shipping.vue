<template>
  <div>
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
                v-model='shipping.firstName'/>
        <br />
        <input  type="text"
                placeholder='last name'
                v-model='shipping.lastName'/>
        <br />
        <input  type="text"
                placeholder='address'
                v-model='shipping.address'/>
        <br />
        <input  type="text"
                placeholder='city'
                v-model='shipping.city'/>
        <br />
        <input  type="text"
                placeholder='state'
                v-model='shipping.state'/>
        <br />
        <input  type="text"
                placeholder='postcode'
                v-model='shipping.postcode'/>
        <br />
        <select v-model='shipping.country'>
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
import { mapState, mapActions } from 'vuex'

export default {
  name: 'billing-shipping',
  components: { loader },
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
    ...mapState(['shop']),
    billing() {
      return this.billingData
    },
    shipping() {
      return this.shippingData
    }
  },
  methods: {
    ...mapActions(['SET_CUSTOMER_INFO']),
    validateBilling() {
      this.missingBilling = []
      Object.keys(this.billing).forEach(key => {
        if (key !== 'state') { // exceptions
          if (this.billing[key] === null) this.missingBilling.push(key)
        }
      })
      // if (this.missingBilling.length === 0) this.$emit('complete', true)
      // else this.$emit('complete', false)
    },
    setShippingInfo() {
      // if not, set same info as the billing address
      this.shipping.firstName = this.billing.firstName
      this.shipping.lastName = this.billing.lastName
      this.shipping.address = this.billing.address
      this.shipping.city = this.billing.city
      this.shipping.state = this.billing.state
      this.shipping.postcode = this.billing.postcode
      this.shipping.country = this.billing.country
    }
  },
  watch: {
    billing: {
      handler (val) {
        if (this.sameAsBilling) {
          this.setShippingInfo()
          this.SET_CUSTOMER_INFO({
            billing: val,
            shipping: val
          })
        } else {
          this.SET_CUSTOMER_INFO({
            billing: val,
            shipping: this.shipping
          })
        }
        this.$emit('shippingZoneChange', this.shipping.country)
      },
      deep: true
    },
    shipping: {
      handler(val) {
        this.$emit('change')
        this.SET_CUSTOMER_INFO({
          billing: this.billing,
          shipping: val
        })
        this.$emit('shippingZoneChange', this.shipping.country)
      },
      deep: true
    }
  }
}
</script>


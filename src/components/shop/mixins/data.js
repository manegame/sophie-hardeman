export default {
  data() {
    return {
      paypalScript: 'https://www.paypalobjects.com/api/checkout.js',
      paypalLoaded: false,
      msg: '',
      billing: {
        firstName: null,
        lastName: null,
        address: null,
        city: null,
        state: '',
        postcode: null,
        country: 'NL',
        email: null,
        phone: null
      },
      shipping: {
        firstName: null,
        lastName: null,
        address: null,
        city: null,
        state: null,
        postcode: null,
        country: 'NL'
      },
      missingBilling: [],
      selectedCountry: 'NL',
      selectedMethod: 'flat_rate',
      shippingZone: [],
      shippingFee: 0,
      billingComplete: false
    }
  }
}

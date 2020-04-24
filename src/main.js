import Vue from 'vue'
import 'babel-polyfill'
import App from './App'
// import AppTest from './AppTest'
import router from './router'
import store from './store'
import VueHead from 'vue-head'
import VueLazyLoad from 'vue-lazyload'
import {format} from 'date-fns'

/**
 * Config
 */

Vue.config.productionTip = false

/**
* Plugins
*/

window.jQuery = window.$ = require('jquery')

Vue.use(VueHead)
Vue.use(VueLazyLoad)

/**
 * Filters
 */

Vue.filter('dotted', (date) => {
  return format(date, 'DD.MM.YYYY')
})

Vue.filter('temperature', (temp) => {
  if (temp > 0) return '+' + temp + '°c'
  else return temp + '°c'
})

Vue.filter('dollify', (code) => {
  if (code === 'USD') {
    return '$'
  } else if (code === 'EUR') {
    return '€'
  } else {
    return ''
  }
})

/**
 * Initiation
 */

new Vue({ // eslint-disable-line no-new
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

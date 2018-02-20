import Vue from 'vue'
import 'babel-polyfill'
import App from './App'
import router from './router'
import store from './store'
import VueHead from 'vue-head'
import {format} from 'date-fns'

// --- GOOGLE ANALYTICS
// import ga from 'vue-ga'
// --- ERROR TRACKING
// import Raven from 'raven-js'
// import RavenVue from 'raven-js/plugins/vue'

// Raven
//     .config('https://---0@sentry.io/---')
//     .addPlugin(RavenVue, Vue)
//     .install()

// ga(router, 'UA-XXXXX')

Vue.config.productionTip = false

Vue.use(VueHead)

Vue.filter('dotted', (date) => {
  return format(date, 'DD.MM.YYYY')
})

Vue.filter('temperature', (temp) => {
  if (temp > 0) return '+' + temp + '°c'
  else return temp + '°c'
})

// required by FullCalendar
window.jQuery = window.$ = require('jquery')
// import 'fullcalendar/dist/fullcalendar.min.js'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
})

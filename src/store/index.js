// Core
import Vue from 'vue'
import Vuex from 'vuex'
import main from './modules/main/main'
import shop from './modules/shop/shop'
import shopify from './modules/shopify'
import createPersistedState from 'vuex-persistedstate'
// import * as Cookies from 'js-cookie'

Vue.use(Vuex)

const DEBUG = process.env.NODE_ENV === 'development'

export default new Vuex.Store({
  modules: {
    main,
    shop,
    shopify
  },
  plugins: [createPersistedState({
    paths: ['shopify.checkout']
    // storage: {
    //   getItem: (key) => {
    //     const result = Cookies.get(key)
    //     console.log(result)
    //     Cookies.getJSON(key)
    //   },
    //   // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
    //   setItem: (key, state) => {
    //     console.log('set called')
    //     Cookies.set(key, state)
    //   },
    //   removeItem: (key) => { Cookies.remove(key) }
    // }
  })],
  strict: DEBUG
})

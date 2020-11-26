// Core
import Vue from 'vue'
import Vuex from 'vuex'
import main from './modules/main/main'
import shopify from './modules/shopify'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'

Vue.use(Vuex)

const DEBUG = process.env.NODE_ENV === 'development'

export default new Vuex.Store({
  modules: {
    main,
    shopify
  },
  plugins: [createPersistedState({
    paths: ['shopify.checkoutId', 'main.firstVisit', 'main.subscribed'],
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => {
        Cookies.set(key, value, { expires: 3, secure: false })
      },
      removeItem: key => Cookies.remove(key)
    }
  })],
  strict: DEBUG
})

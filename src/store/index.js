// Core
import Vue from 'vue'
import Vuex from 'vuex'
import main from './modules/main/main'
import shop from './modules/shop/shop'

// Save state
// import createPersistedState from 'vuex-persistedstate'
// import * as Cookies from 'js-cookie'

Vue.use(Vuex)

const DEBUG = process.env.NODE_ENV === 'development'

export default new Vuex.Store({
  // plugins: [createPersistedState()],
  modules: {
    main,
    shop
  },
  strict: DEBUG
})

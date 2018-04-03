import Vue from 'vue'
import Vuex from 'vuex'
import main from './modules/main/main'
import shop from './modules/shop/shop'

Vue.use(Vuex)

const DEBUG = process.env.NODE_ENV === 'development'

export default new Vuex.Store({
  modules: {
    main,
    shop
  },
  strict: DEBUG
})

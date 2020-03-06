import shopify from '../../../service/shopify.js'
import * as actionTypes from './actionTypes'
import * as mutationTypes from './mutationTypes'

const state = {
  products: []
}

const actions = {
  async [actionTypes.GET_PRODUCTS]({commit}) {
    commit(mutationTypes.SET_PRODUCTS, await shopify.getProducts())
  }
}

const mutations = {
  [mutationTypes.SET_PRODUCTS](state, data) {
    state.products = data
  }
}

const getters = {
  // shippingLoadedState: state => state.shippingLoaded
}

export default {
  state,
  actions,
  mutations,
  getters
}

import shopify from '../../../service/shopify.js'
import * as actionTypes from './actionTypes'
import * as mutationTypes from './mutationTypes'

const state = {
  collections: [],
  product: null,
  products: [],
  checkout: null
}

const actions = {
  async [actionTypes.GET_SHOPIFY_COLLECTIONS]({commit}) {
    commit(mutationTypes.SET_COLLECTIONS, await shopify.getCollections())
  },
  async [actionTypes.GET_PRODUCT]({commit}, handle) {
    commit(mutationTypes.SET_PRODUCT, await shopify.getProductByHandle(handle))
  },
  async [actionTypes.GET_PRODUCTS]({commit}) {
    commit(mutationTypes.SET_PRODUCTS, await shopify.getProducts())
  },
  async [actionTypes.CREATE_CHECKOUT]({commit}) {
    commit(mutationTypes.SET_CHECKOUT, await shopify.createCheckout())
  },
  async [actionTypes.ADD_LINE_ITEMS]({commit}, data) {
    commit(mutationTypes.SET_CHECKOUT, await shopify.addLineItems(data.id, data.lineItemsToAdd))
  },
  async [actionTypes.GET_CHECKOUT]({commit}, id) {
    commit(mutationTypes.SET_CHECKOUT, await shopify.getCheckout(id))
  }
}

const mutations = {
  [mutationTypes.SET_COLLECTIONS](state, data) {
    state.collections = data
  },
  [mutationTypes.SET_PRODUCT](state, data) {
    state.product = data
  },
  [mutationTypes.SET_PRODUCTS](state, data) {
    state.products = data
  },
  [mutationTypes.SET_CHECKOUT](state, data) {
    state.checkout = data
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

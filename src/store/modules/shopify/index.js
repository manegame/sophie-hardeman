import shopify from '../../../service/shopify.js'
import ShopifyClient from '../../../service/shopifyExtended'
import * as actionTypes from './actionTypes'
import * as mutationTypes from './mutationTypes'

const shopifyExtended = new ShopifyClient()

const state = {
  collections: [],
  collection: null,
  product: null,
  products: [],
  productTypes: [],
  checkout: null,
  checkoutId: null,
  wishList: []
}

const actions = {
  [actionTypes.RESET_SHOPIFY]({commit}) {
    commit(mutationTypes.RESET_SHOPIFY)
  },
  [actionTypes.INITIALIZE_CHECKOUT]({dispatch, state}) {
    if (state.checkoutId === null) {
      console.log(state.checkoutId)
      dispatch(actionTypes.CREATE_CHECKOUT)
    } else {
      dispatch(actionTypes.GET_CHECKOUT, state.checkoutId)
    }
  },
  async [actionTypes.GET_SHOPIFY_COLLECTIONS]({commit}) {
    commit(mutationTypes.SET_SHOPIFY_COLLECTIONS, await shopify.getCollections())
  },
  async [actionTypes.GET_PRODUCT]({commit}, handle) {
    commit(mutationTypes.SET_PRODUCT, await shopify.getProductByHandle(handle))
  },
  async [actionTypes.GET_PRODUCTS]({commit}) {
    commit(mutationTypes.SET_PRODUCTS, await shopify.getProducts())
  },
  async [actionTypes.GET_MORE_PRODUCTS]({commit}, products) {
    commit(mutationTypes.SET_MORE_PRODUCTS, await shopify.getMoreProducts(products))
  },
  async [actionTypes.GET_PRODUCT_TYPES]({commit}) {
    commit(mutationTypes.SET_PRODUCT_TYPES, await shopifyExtended.allProductTypes())
  },
  async [actionTypes.CREATE_CHECKOUT]({commit}) {
    commit(mutationTypes.SET_CHECKOUT, await shopify.createCheckout())
  },
  async [actionTypes.ADD_LINE_ITEMS]({commit}, data) {
    commit(mutationTypes.SET_CHECKOUT, await shopify.addLineItems(data.id, data.lineItemsToAdd))
  },
  async [actionTypes.REMOVE_LINE_ITEMS]({commit}, data) {
    commit(mutationTypes.SET_CHECKOUT, await shopify.removeLineItems(data.id, data.lineItemsToRemove))
  },
  async [actionTypes.GET_CHECKOUT]({commit}, id) {
    commit(mutationTypes.SET_CHECKOUT, await shopify.getCheckout(id))
  },
  [actionTypes.ADD_WISHLIST]({commit}, id) {
    commit(mutationTypes.ADD_WISHLIST, id)
  }
}

const mutations = {
  [mutationTypes.RESET_SHOPIFY](state) {
    state.collections = []
    state.product = null
    state.products = []
    state.checkout = null
  },
  [mutationTypes.SET_SHOPIFY_COLLECTIONS](state, data) {
    state.collections = data
  },
  [mutationTypes.SET_PRODUCT](state, data) {
    state.product = data
  },
  [mutationTypes.SET_PRODUCTS](state, data) {
    console.log(data)
    state.products = data
  },
  [mutationTypes.SET_MORE_PRODUCTS](state, data) {
    console.log('more', data)
    state.products.push(data)
  },
  [mutationTypes.SET_PRODUCT_TYPES](state, data) {
    state.productTypes = data
  },
  [mutationTypes.SET_CHECKOUT](state, data) {
    console.log('set checkout')
    state.checkout = data
    state.checkoutId = data.id
  },
  [mutationTypes.ADD_WISHLIST](state, data) {
    console.log('set wishlist')
    state.wishList.push(data)
  },
  [mutationTypes.REMOVE_WISHLIST](state, data) {
    // state.wishList.push(data)
  }
}

const getters = {
  uniqueProductTypes: (state) => {
    const mapped = state.productTypes.map((type) => {
      return type.node.productType
    })

    const result = mapped.reduce((p, c) => {
      if (!p.includes(c)) p.push(c)
      return p
    }, [])

    return result
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}

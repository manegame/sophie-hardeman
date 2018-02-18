import api from '../../service/wp'
import * as actionTypes from '../actionTypes'
import * as mutationTypes from '../mutationTypes'

const emptySingle = {}

const state = {
  banner: {},
  collections: [],
  single: emptySingle,
  diary: [],
  events: []
}

const actions = {
  async [actionTypes.GET_BANNER]({commit, state}) {
    commit(mutationTypes.SET_BANNER, await api.getBanner())
  },
  async [actionTypes.GET_COLLECTIONS]({commit, state}) {
    commit(mutationTypes.SET_COLLECTIONS, await api.getCollections())
  },
  async [actionTypes.GET_SINGLE_COLLECTION]({commit, state}, slug) {
    commit(mutationTypes.SET_SINGLE_COLLECTION, await api.getSingleCollection(slug))
  },
  async [actionTypes.CLEAR_SINGLE_COLLECTION]({commit, state}) {
    commit(mutationTypes.CLEAR_SINGLE_COLLECTION)
  },
  async [actionTypes.GET_DIARY]({commit, state}) {
    commit(mutationTypes.SET_DIARY, await api.getDiary())
  },
  async [actionTypes.GET_EVENTS]({commit, state}) {
    commit(mutationTypes.SET_EVENTS, await api.getEvents())
  }
}

const mutations = {
  [mutationTypes.SET_BANNER](state, data) {
    state.banner = data[0]
    console.log('banner fetched')
  },
  [mutationTypes.SET_COLLECTIONS](state, data) {
    state.collections = data
    console.log('collections fetched')
  },
  [mutationTypes.SET_SINGLE_COLLECTION](state, data) {
    state.single = data[0]
    console.log('single collection fetched')
  },
  [mutationTypes.CLEAR_SINGLE_COLLECTION](state, data) {
    state.single = emptySingle
  },
  [mutationTypes.SET_DIARY](state, data) {
    state.diary = data
    console.log('diary entries fetched')
  },
  [mutationTypes.SET_EVENTS](state, data) {
    state.events = data
    console.log('events fetched')
  }
}

export default {
  state,
  actions,
  mutations
}

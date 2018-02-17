import api from '../../service/wp'
import * as actionTypes from '../actionTypes'
import * as mutationTypes from '../mutationTypes'

const state = {
  banner: {},
  collections: [],
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
  async [actionTypes.GET_DIARY]({commit, state}) {
    commit(mutationTypes.SET_DIARY, await api.getDiary())
  },
  async [actionTypes.GET_EVENTS]({commit, state}) {
    commit(mutationTypes.SET_EVENTS, await api.getEvents())
  }
}

const mutations = {
  [mutationTypes.SET_BANNER](state, data) {
    console.log('banner fetched')
    state.banner = data[0]
  },
  [mutationTypes.SET_COLLECTIONS](state, data) {
    console.log('collections fetched')
    state.collections = data
  },
  [mutationTypes.SET_DIARY](state, data) {
    console.log('diary entries fetched')
    state.diary = data
  },
  [mutationTypes.SET_EVENTS](state, data) {
    console.log('events fetched')
    state.events = data
  }
}

export default {
  state,
  actions,
  mutations
}

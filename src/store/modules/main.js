import api from '../../service/wp'
import * as actionTypes from '../actionTypes'
import * as mutationTypes from '../mutationTypes'

const state = {
  posts: []
}

const actions = {
  async [actionTypes.GET_POSTS]({commit, state}) {
    commit(mutationTypes.SET_POSTS, await api.getPosts())
  }
}

const mutations = {
  [mutationTypes.SET_POSTS](state, data) {
    state.posts = data
  }
}

export default {
  state,
  actions,
  mutations
}

import api from '../../service/wp'
import ow from '../../service/open_weather'
import * as actionTypes from '../actionTypes'
import * as mutationTypes from '../mutationTypes'

const emptySingle = {
  title: '',
  slug: '',
  date: '',
  acf: {},
  garments: [],
  videos: []
}

const emptyWeather = {}

const state = {
  single: emptySingle,
  banner: {},
  collections: [],
  diary: [],
  events: [],
  about: [],
  single_about: {},
  single_garment: {},
  videos: [],
  garments: [],
  garment_categories: [],
  weather: emptyWeather
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
  async [actionTypes.GET_SINGLE_ABOUT]({commit, state}, slug) {
    commit(mutationTypes.SET_SINGLE_ABOUT, await api.getSingleAbout(slug))
  },
  async [actionTypes.CLEAR_SINGLES]({commit, state}) {
    commit(mutationTypes.CLEAR_SINGLES)
  },
  async [actionTypes.GET_DIARY]({commit, state}) {
    commit(mutationTypes.SET_DIARY, await api.getDiary())
  },
  async [actionTypes.GET_EVENTS]({commit, state}) {
    commit(mutationTypes.SET_EVENTS, await api.getEvents())
  },
  async [actionTypes.GET_GARMENT]({commit, state}, slug) {
    commit(mutationTypes.SET_GARMENT, await api.getGarment(slug))
  },
  async [actionTypes.GET_SINGLE_GARMENT]({commit, state}, slug) {
    commit(mutationTypes.SET_SINGLE_GARMENT, await api.getSingleGarment(slug))
  },
  async [actionTypes.GET_GARMENTS]({commit, state}, slug) {
    commit(mutationTypes.SET_GARMENTS, await api.getGarments(slug))
  },
  async [actionTypes.GET_GARMENT_CATEGORIES]({commit, state}) {
    commit(mutationTypes.SET_GARMENT_CATEGORIES, await api.getGarmentCategories())
  },
  async [actionTypes.GET_ABOUT]({commit, state}) {
    commit(mutationTypes.SET_ABOUT, await api.getAbout())
  },
  async [actionTypes.GET_VIDEOS]({commit, state}) {
    commit(mutationTypes.SET_VIDEOS, await api.getVideos())
  },
  async [actionTypes.GET_VIDEO]({commit, state}, slug) {
    commit(mutationTypes.SET_VIDEO, await api.getVideo(slug))
  },
  async [actionTypes.GET_WEATHER]({commit, state}) {
    commit(mutationTypes.SET_WEATHER, await ow.getWeather())
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
    state.single.title = data.title
    state.single.slug = data.slug
    state.single.modified = data.modified
    state.single.acf = data.acf
    state.single.garments = []
    state.single.videos = []
    console.log('after single collection (1)')
  },
  [mutationTypes.SET_SINGLE_ABOUT](state, data) {
    state.single_about = data
  },
  [mutationTypes.CLEAR_SINGLES](state, data) {
    state.single = emptySingle
    state.single_about = {}
  },
  [mutationTypes.SET_DIARY](state, data) {
    state.diary = data
    console.log('diary entries fetched')
  },
  [mutationTypes.SET_EVENTS](state, data) {
    state.events = data
    console.log('events fetched')
  },
  [mutationTypes.SET_GARMENT](state, data) {
    console.log('params ' + this)
    state.single.garments.push(data)
    console.log('garment set')
  },
  [mutationTypes.SET_SINGLE_GARMENT](state, data) {
    state.single_garment = data
    console.log('garment set')
  },
  [mutationTypes.SET_GARMENTS](state, data) {
    state.garments = data
    console.log('garments set')
  },
  [mutationTypes.SET_GARMENT_CATEGORIES](state, data) {
    state.garment_categories = data
    console.log('garments fetched')
  },
  [mutationTypes.SET_ABOUT](state, data) {
    state.about = data
    console.log('about fetched')
  },
  [mutationTypes.SET_VIDEOS](state, data) {
    state.videos = data
    console.log('videos fetched')
  },
  [mutationTypes.SET_VIDEO](state, data) {
    state.single.videos.push(data)
    console.log('videos set')
  },
  [mutationTypes.SET_WEATHER](state, data) {
    if (state.weather === emptyWeather) {
      state.weather = data
      console.log('weather set')
    } else {
      console.log('leaving the weather as is')
    }
  }
}

export default {
  state,
  actions,
  mutations
}

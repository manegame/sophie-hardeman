import api from '../../../service/wp'
import ow from '../../../service/open_weather'
import * as actionTypes from './actionTypes'
import * as mutationTypes from './mutationTypes'

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
  single_stockist: {},
  single_about: {},
  single_event: {},
  single_garment: {},
  single_video: {},
  banner: {},
  collections: [],
  diary: [],
  events: [],
  about: [],
  stockists: [],
  videos: [],
  garments: [],
  garment_categories: [],
  weather: emptyWeather,
  community: [],
  impressum: [],
  single_impressum: [],
  big_cartel: {
    shop: {},
    products: []
  }
}

const actions = {
  async [actionTypes.GET_COMMUNITY]({commit, state}) {
    commit(mutationTypes.SET_COMMUNITY, await api.getCommunity())
  },
  async [actionTypes.GET_IMPRESSUM]({commit, state}) {
    commit(mutationTypes.SET_IMPRESSUM, await api.getImpressum())
  },
  async [actionTypes.GET_SINGLE_IMPRESSUM]({commit, state}, slug) {
    commit(mutationTypes.SET_SINGLE_IMPRESSUM, await api.getSingleImpressum(slug))
  },
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
  async [actionTypes.GET_SINGLE_EVENT]({commit, state}, slug) {
    commit(mutationTypes.SET_SINGLE_EVENT, await api.getSingleEvent(slug))
  },
  async [actionTypes.GET_STOCKISTS]({commit, state}) {
    commit(mutationTypes.SET_STOCKISTS, await api.getStockists())
  },
  async [actionTypes.GET_SINGLE_STOCKIST]({commit, state}, slug) {
    commit(mutationTypes.SET_SINGLE_STOCKIST, await api.getSingleStockist(slug))
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
  async [actionTypes.GET_SINGLE_VIDEO]({commit, state}, slug) {
    commit(mutationTypes.SET_SINGLE_VIDEO, await api.getVideo(slug))
  },
  async [actionTypes.GET_WEATHER]({commit, state}) {
    commit(mutationTypes.SET_WEATHER, await ow.getWeather())
  }
}

const mutations = {
  [mutationTypes.SET_SINGLE_IMPRESSUM](state, data) {
    state.single_impressum = data
  },
  [mutationTypes.SET_IMPRESSUM](state, data) {
    state.impressum = data
  },
  [mutationTypes.SET_COMMUNITY](state, data) {
    state.community = data
  },
  [mutationTypes.SET_BANNER](state, data) {
    state.banner = data
  },
  [mutationTypes.SET_COLLECTIONS](state, data) {
    state.collections = data
  },
  [mutationTypes.SET_SINGLE_COLLECTION](state, data) {
    state.single.title = data.title
    state.single.slug = data.slug
    state.single.modified = data.modified
    state.single.acf = data.acf
    state.single.garments = []
    state.single.videos = []
  },
  [mutationTypes.SET_SINGLE_ABOUT](state, data) {
    state.single_about = data
  },
  [mutationTypes.SET_SINGLE_STOCKIST](state, data) {
    state.single_stockist = data
  },
  [mutationTypes.CLEAR_SINGLES](state, data) {
    state.single = emptySingle
    state.single_about = {}
  },
  [mutationTypes.SET_DIARY](state, data) {
    state.diary = data
  },
  [mutationTypes.SET_EVENTS](state, data) {
    state.events = data
  },
  [mutationTypes.SET_SINGLE_EVENT](state, data) {
    state.single_event = data
  },
  [mutationTypes.SET_STOCKISTS](state, data) {
    state.stockists = data
  },
  [mutationTypes.SET_GARMENT](state, data) {
    state.single.garments.push(data)
  },
  [mutationTypes.SET_SINGLE_GARMENT](state, data) {
    state.single_garment = data
  },
  [mutationTypes.SET_GARMENTS](state, data) {
    state.garments = data
  },
  [mutationTypes.SET_GARMENT_CATEGORIES](state, data) {
    state.garment_categories = data
  },
  [mutationTypes.SET_ABOUT](state, data) {
    state.about = data
  },
  [mutationTypes.SET_VIDEOS](state, data) {
    state.videos = data
  },
  [mutationTypes.SET_VIDEO](state, data) {
    state.single.videos.push(data)
    console.log('get a video')
  },
  [mutationTypes.SET_SINGLE_VIDEO](state, data) {
    state.single_video = data
  },
  [mutationTypes.SET_WEATHER](state, data) {
    if (state.weather === emptyWeather) {
      state.weather = data
    }
  }
}

export default {
  state,
  actions,
  mutations
}

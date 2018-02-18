import Vue from 'vue'
import VueResource from 'vue-resource'

const API_ROOT = 'http://s-h.manusnijhoff.nl/wp-json/wp/v2/'

Vue.use(VueResource)

Vue.http.options.crossOrigin = true

export default {
  getBanner() {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + 'pages?slug=banner').then(
        response => {
          resolve(response.body)
        },
        response => {
          reject(response)
        }
      )
    })
  },
  getCollections() {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + 's-h_collection?per_page=20').then(
        response => {
          resolve(response.body)
        },
        response => {
          reject(response)
        }
      )
    })
  },
  getSingleCollection(slug) {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + 's-h_collection?slug=' + slug + '&field=title,acf,slug').then(
        response => {
          resolve(response.body)
        },
        response => {
          reject(response)
        }
      )
    })
  },
  getDiary() {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + 's-h_diary?per_page=100').then(
        response => {
          resolve(response.body)
        },
        response => {
          reject(response)
        }
      )
    })
  },
  getEvents() {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + 's-h_events?per_page=20').then(
        response => {
          resolve(response.body)
        },
        response => {
          reject(response)
        }
      )
    })
  }
}

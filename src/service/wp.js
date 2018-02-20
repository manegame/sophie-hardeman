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
  getGarmentCategories() {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + 's-h_garment_category').then(
        response => {
          resolve(response.body)
        },
        response => {
          reject(response)
        }
      )
    })
  },
  getGarment(slug) {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + 's-h_garments/' + slug).then(
        response => {
          resolve(response.body)
        },
        response => {
          reject(response)
        }
      )
    })
  },
  getVideo(slug) {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + 's-h_videos/' + slug).then(
        response => {
          resolve(response.body)
        },
        response => {
          reject(response)
        }
      )
    })
  },
  getAbout() {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + 's-h_about?per_page=10').then(
        response => {
          resolve(response.body)
        },
        response => {
          reject(response)
        }
      )
    })
  },
  getVideos() {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + 's-h_videos?per_page=100').then(
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
          resolve(response.body[0])
        },
        response => {
          reject(response)
        }
      )
    })
  },
  getSingleAbout(slug) {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + 's-h_about?slug=' + slug + '&field=title,acf,slug').then(
        response => {
          resolve(response.body[0])
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

import Vue from 'vue'
import VueResource from 'vue-resource'
import { API_ROOT } from './root'
const API_VERSION = 'wp-json/wp/v2/'

Vue.use(VueResource)

Vue.http.options.crossOrigin = true

export default {
  getBanner() {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + API_VERSION + 'pages?slug=banner').then(
        response => {
          resolve(response.body[0].acf)
        },
        response => {
          reject(response)
        }
      )
    })
  },
  getCollections() {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + API_VERSION + 's-h_collection?per_page=20').then(
        response => {
          resolve(response.body)
        },
        response => {
          reject(response)
        }
      )
    })
  },
  getImpressum() {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + API_VERSION + 's-h_misc?per_page=10').then(
        response => {
          resolve(response.body)
        },
        response => {
          reject(response)
        }
      )
    })
  },
  getSingleImpressum(slug) {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + API_VERSION + 's-h_misc/?slug=' + slug).then(
        response => {
          resolve(response.body[0])
        },
        response => {
          reject(response)
        }
      )
    })
  },
  getCommunity() {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + API_VERSION + 's-h_community?per_page=99&filter[orderby]=date&order=desc').then(
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
      Vue.http.get(API_ROOT + API_VERSION + 's-h_garment_category').then(
        response => {
          resolve(response.body)
        },
        response => {
          reject(response)
        }
      )
    })
  },
  // get single garment by slug name. used in collections
  getGarment(slug) {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + API_VERSION + 's-h_garments/' + slug).then(
        response => {
          resolve(response.body)
        },
        response => {
          reject(response)
        }
      )
    })
  },
  // get single garment by slug name
  getSingleGarment(slug) {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + API_VERSION + 's-h_garments/?slug=' + slug).then(
        response => {
          resolve(response.body[0])
        },
        response => {
          reject(response)
        }
      )
    })
  },
  getGarments(slug) {
    if (slug === 'all') {
      return new Promise((resolve, reject) => {
        Vue.http.get(API_ROOT + API_VERSION + 's-h_garments?per_page=99&filter[orderby]=rand').then(
          response => {
            resolve(response.body)
          },
          response => {
            reject(response)
          }
        )
      })
    } else {
      return new Promise((resolve, reject) => {
        Vue.http.get(API_ROOT + API_VERSION + 's-h_garments?s-h_garment_category=' + slug).then(
          response => {
            resolve(response.body)
          },
          response => {
            reject(response)
          }
        )
      })
    }
  },
  getVideo(slug) {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + API_VERSION + 's-h_videos/' + slug).then(
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
      Vue.http.get(API_ROOT + API_VERSION + 's-h_about?per_page=10').then(
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
      Vue.http.get(API_ROOT + API_VERSION + 's-h_videos?per_page=100').then(
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
      Vue.http.get(API_ROOT + API_VERSION + 's-h_collection?slug=' + slug + '&field=title,acf,slug').then(
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
      Vue.http.get(API_ROOT + API_VERSION + 's-h_about?slug=' + slug + '&field=title,acf,slug').then(
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
      Vue.http.get(API_ROOT + API_VERSION + 's-h_diary?per_page=100&filter[orderby]=date&order=asc').then(
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
      Vue.http.get(API_ROOT + API_VERSION + 's-h_events?per_page=20').then(
        response => {
          resolve(response.body)
        },
        response => {
          reject(response)
        }
      )
    })
  },
  getSingleEvent(slug) {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + API_VERSION + 's-h_events?slug=' + slug + '&field=title,acf,slug').then(
        response => {
          resolve(response.body[0])
        },
        response => {
          reject(response)
        }
      )
    })
  },
  getStockists() {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + API_VERSION + 's-h_stockists?per_page=50').then(
        response => {
          resolve(response.body)
        },
        response => {
          reject(response)
        }
      )
    })
  },
  getSingleStockist(slug) {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + API_VERSION + 's-h_stockists?slug=' + slug + '&field=title,acf,slug').then(
        response => {
          resolve(response.body[0])
        },
        response => {
          reject(response)
        }
      )
    })
  }
}

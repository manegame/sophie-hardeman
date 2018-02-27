import Vue from 'vue'
import VueResource from 'vue-resource'

const API_ROOT = 'http://s-h.manusnijhoff.nl/wp-json/wp/v2/'

Vue.use(VueResource)

Vue.http.options.crossOrigin = true

export default {
  getBanner() {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + 'pages?slug=banner&fields=acf').then(
        response => {
          console.log(response.body)
          resolve(response.body[0].acf.banner)
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
  getImpressum() {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + 's-h_misc?per_page=10').then(
        response => {
          resolve(response.body)
        },
        response => {
          reject(response)
        }
      )
    })
  },
  getRandomImages() {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + 'pages?slug=random-images&fields=acf').then(
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
      Vue.http.get(API_ROOT + 's-h_misc/?slug=' + slug).then(
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
      Vue.http.get(API_ROOT + 's-h_community?per_page=99&filter[orderby]=date&order=desc').then(
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
  // get single garment by slug name. used in collections
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
  // get single garment by slug name
  getSingleGarment(slug) {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + 's-h_garments/?slug=' + slug).then(
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
      console.log('getting all garments!')
      return new Promise((resolve, reject) => {
        Vue.http.get(API_ROOT + 's-h_garments?per_page=99').then(
          response => {
            resolve(response.body)
          },
          response => {
            reject(response)
          }
        )
      })
    } else {
      console.log('getting some garments')
      return new Promise((resolve, reject) => {
        Vue.http.get(API_ROOT + 's-h_garments?s-h_garment_category=' + slug).then(
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
      Vue.http.get(API_ROOT + 's-h_diary?per_page=100&filter[orderby]=date&order=asc').then(
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
  },
  getSingleEvent(slug) {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + 's-h_events?slug=' + slug + '&field=title,acf,slug').then(
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
      Vue.http.get(API_ROOT + 's-h_stockists?per_page=50').then(
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
      Vue.http.get(API_ROOT + 's-h_stockists?slug=' + slug + '&field=title,acf,slug').then(
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

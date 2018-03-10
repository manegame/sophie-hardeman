import Vue from 'vue'
import VueResource from 'vue-resource'

const API_ROOT = 'https://api.bigcartel.com/hardeman/'

Vue.use(VueResource)

export default {
  getStore() {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + 'store.json').then(
        response => {
          resolve(response.body)
        },
        response => {
          reject(response)
        }
      )
    })
  },
  getProducts() {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + 'products.json').then(
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

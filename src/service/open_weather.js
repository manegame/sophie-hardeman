import Vue from 'vue'
import VueResource from 'vue-resource'

const API_ROOT = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'c6950d40c0e7f784238f74eacdb29074'
const AMSTERDAM_ZUIDOOST = '6544881'

Vue.use(VueResource)

Vue.http.options.crossOrigin = true

export default {
  getWeather() {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + '?id=' + AMSTERDAM_ZUIDOOST + '&APPID=' + API_KEY + '&units=metric').then(
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

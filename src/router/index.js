import Vue from 'vue'
import Router from 'vue-router'

const landing = () => import('@/views/landing')
const collection = () => import('@/views/collection')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landing',
      component: landing
    },
    {
      path: '/collection/:slug',
      name: 'collection',
      component: collection
    },
    {
      path: '/diary/:slug',
      name: 'diary',
      component: collection
    }
  ]
})

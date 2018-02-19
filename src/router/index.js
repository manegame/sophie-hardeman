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
      path: '/about/:slug',
      name: 'about',
      component: collection
    },
    {
      path: '/sale/:slug',
      name: 'sale',
      component: collection
    },
    {
      path: '/hardeman-tv/:slug',
      name: 'hardeman tv',
      component: collection
    },
    {
      path: '/diary/:slug',
      name: 'diary',
      component: collection
    }
  ]
})

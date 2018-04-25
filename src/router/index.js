import Vue from 'vue'
import Router from 'vue-router'

const landing = () => import('@/views/landing')
const collection = () => import('@/views/collection')
const about = () => import('@/views/about')
const hardemanTV = () => import('@/views/hardeman-tv')
const sale = () => import('@/views/sale')
const singleSale = () => import('@/views/single-sale')
const diary = () => import('@/views/diary')
const stockists = () => import('@/views/stockists')
const events = () => import('@/views/events')
const impressum = () => import('@/views/impressum')
const community = () => import('@/views/community')
const checkout = () => import('@/views/checkout')
const orderComplete = () => import('@/views/order-complete')

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
      redirect: {name: 'collection', params: {section: 'lookbook'}}
    },
    {
      path: '/collection/:slug/:section',
      name: 'collection',
      component: collection
    },
    {
      path: '/about/:slug',
      name: 'about',
      component: about
    },
    {
      path: '/sale/:slug',
      name: 'sale',
      component: sale
    },
    {
      path: '/sale/:slug/:item',
      name: 'single sale',
      component: singleSale
    },
    {
      path: '/hardeman-tv/:slug',
      name: 'hardeman tv',
      component: hardemanTV
    },
    {
      path: '/diary/:slug',
      name: 'diary',
      component: diary
    },
    {
      path: '/stockist/:slug',
      name: 'stockists',
      component: stockists
    },
    {
      path: '/event/:slug',
      name: 'events',
      component: events
    },
    {
      path: '/impressum/:slug',
      name: 'impressum',
      component: impressum
    },
    {
      path: '/community/:slug',
      name: 'community',
      component: community
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: checkout
    },
    {
      path: '/checkout/complete',
      name: 'order-complete',
      component: orderComplete
    }
  ]
})

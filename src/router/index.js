import Vue from 'vue'
import Router from 'vue-router'
import VueAnalytics from 'vue-ua'

Vue.use(Router)

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

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landing',
      component: landing
    },
    // COLLECTIONS
    {
      path: '/s-h_collection/:slug/:section',
      redirect: { name: 'collection' }
    },
    {
      alias: '/s-h_collection/:slug/:section',
      path: '/collection/:slug/:section',
      name: 'collection',
      component: collection
    },
    // ABOUT
    {
      path: '/s-h_about/:slug',
      redirect: { name: 'about' }
    },
    {
      alias: '/s-h_about/:slug',
      path: '/about/:slug',
      name: 'about',
      component: about
    },
    // SHOP
    // COLLECTIONS
    {
      path: '/product/:slug',
      redirect: { name: 'sale' }
    },
    {
      alias: '/product/:slug',
      path: '/shop/:slug',
      name: 'sale',
      component: sale
    },
    {
      path: '/product/:slug/:item',
      redirect: { name: 'single sale' }
    },
    {
      alias: '/product/:slug/:item',
      path: '/shop/:slug/:item',
      name: 'single sale',
      component: singleSale
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
    },
    // HARDEMAN TV
    {
      path: '/s-h_videos/:slug',
      redirect: { name: 'hardeman tv' }
    },
    {
      alias: '/s-h_videos/:slug',
      path: '/hardeman-tv/:slug',
      name: 'hardeman tv',
      component: hardemanTV
    },
    // DIARY
    {
      path: '/s-h_diary/:slug',
      redirect: { name: 'diary' }
    },
    {
      alias: '/s-h_diary/:slug',
      path: '/diary/:slug',
      name: 'diary',
      component: diary
    },
    // STOCKISTS
    {
      path: '/s-h_stockist/:slug',
      redirect: { name: 'stockists' }
    },
    {
      alias: '/s-h_stockist/:slug',
      path: '/stockists/:slug',
      name: 'stockists',
      component: stockists
    },
    // EVENTS
    {
      path: '/s-h_events/:slug',
      redirect: { name: 'events' }
    },
    {
      alias: '/s-h_events/:slug',
      path: '/events/:slug',
      name: 'events',
      component: events
    },
    // IMPRESSUM
    {
      path: '/s-h_misc/:slug',
      redirect: { name: 'impressum' }
    },
    {
      alias: '/s-h_misc/:slug',
      path: '/impressum/:slug',
      name: 'impressum',
      component: impressum
    },
    // COMMUNITY
    {
      path: '/s-h_community/:slug',
      redirect: { name: 'community' }
    },
    {
      alias: '/s-h_community/:slug',
      path: '/community/:slug',
      name: 'community',
      component: community
    }
  ]
})

Vue.use(VueAnalytics, {
  appName: 'HARDEMAN',
  debug: true,
  appVersion: '1.1',
  trackingId: 'UA-69252921-6',
  trackPage: true,
  vueRouter: router
})

export default router

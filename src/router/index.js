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
      path: '/s-h_collection/:slug',
      redirect: {name: 'collection', params: {section: 'lookbook'}}
    },
    {
      path: '/s-h_collection/:slug/:section',
      name: 'collection',
      component: collection,
      alias: '/c'
    },
    {
      path: '/s-h_about/:slug',
      name: 'about',
      component: about
    },
    {
      path: '/product/:slug',
      name: 'sale',
      component: sale
    },
    {
      path: '/product/:item',
      name: 'single sale',
      component: singleSale
    },
    {
      path: '/s-h_videos/:slug',
      name: 'hardeman tv',
      component: hardemanTV
    },
    {
      path: '/s-h_diary/:slug',
      name: 'diary',
      component: diary
    },
    {
      path: '/s-h_stockist/:slug',
      name: 'stockists',
      component: stockists
    },
    {
      path: '/s-h_events/:slug',
      name: 'events',
      component: events
    },
    {
      path: '/s-h_misc/:slug',
      name: 'impressum',
      component: impressum
    },
    {
      path: '/s-h_community/:slug',
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

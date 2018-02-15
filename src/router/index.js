import Vue from 'vue'
import Router from 'vue-router'

const temp = () => import('@/components/temp')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/:language',
      name: 'home',
      component: temp
    }
  ]
})

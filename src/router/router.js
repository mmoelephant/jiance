import Vue from 'vue'
import Router from 'vue-router'
import reportIndex from '../views/intellReport/reportIndex.vue'
import rout from './routerstt'

Vue.use(Router)

let routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path:'/reportIndex',
    name:'reportIndex',
    component:reportIndex
  },
  {path: '/setting',
    name: 'setting',
    component: () => import('../views/setting.vue')
  },
  {path: '/ref',
    name: 'ref',
    component: () => import('../views/ref.vue')
  },
]
routes.push(...rout)
export default new Router({
  routes
})

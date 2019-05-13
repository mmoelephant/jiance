import Vue from 'vue'
import Router from 'vue-router'
import reportIndex from '../views/intellReport/reportIndex.vue'
import reportDetail from '../views/intellReport/reportDetail.vue'
import dataIndex from '../views/dataSubscribe/index.vue'
import dataDetail from '../views/dataSubscribe/subDetail.vue'
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
  {
    path:'/reportDetail',
    name:'reportDetail',
    component:reportDetail
  },
  {
    path:'/dataIndex',
    name:'dataIndex',
    component:dataIndex
  },
  {
    path:'/dataDetail',
    name:'dataDetail',
    component:dataDetail
  },
  {path: '/setting',
    name: 'setting',
    component: () => import('../views/setting.vue')
  },
  {
    path: '/ref',
    name: 'ref',
    component: () => import('../views/ref.vue')
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('../views/help/help.vue')
  },
]
routes.push(...rout)
export default new Router({
  routes
})

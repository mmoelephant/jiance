import Vue from 'vue'
import Router from 'vue-router'
import reportIndex from '../views/intellReport/reportIndex.vue'
import reportDetail from '../views/intellReport/reportDetail.vue'

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
    component:reportIndex,
    children:[
      {
        path:'reportDetail',
        name:'reportDetail',
        component:reportDetail
      },
    ]
  },
  {
    path: '/ref',
    name: 'ref',
    component: () => import('../views/ref.vue')
  },
  {
    path:'/copy',
    name:'copy',
    component:() => import('../views/copy.vue')
  },
]
let router = new Router({
  routes
})
router.beforeEach((to, from, next) => {
  if(to.name != 'index'&& to.name != 'login'&& to.name != 'help') {
    const userid = localStorage.getItem('userid')
    const user = JSON.parse(localStorage.getItem('user'))
    if(userid && user && user.username) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
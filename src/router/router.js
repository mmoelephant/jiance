import Vue from 'vue'
import Router from 'vue-router'
import reportIndex from '../views/intellReport/reportIndex.vue'
import reportDetail from '../views/intellReport/reportDetail.vue'
// import dataIndex from '../views/dataSubscribe/index.vue'
// import dataDetail from '../views/dataSubscribe/subDetail.vue'
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
  // {
  //   path: '/index',
  //   name: 'index',
  //   component: () => import('../views/index.vue')
  // },
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
//   {
//     path:'/reportDetail',
//     name:'reportDetail',
//     component:reportDetail
//   },
  // {
  //   path:'/dataIndex',
  //   name:'dataIndex',
  //   component:dataIndex,
  //   children:[
	// 	{
	// 		path:'dataDetail',
	// 		name:'dataDetail',
	// 		component:dataDetail
	// 	},
	// ]
  // },
//   {
//     path:'/dataDetail',
//     name:'dataDetail',
//     component:dataDetail
//   },
  //   component:reportIndex
  // },
  // {
  //   path:'/dataIndex',
  //   name:'dataIndex',
  //   component:dataIndex
  // },
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
  // {
  //   path: '*',
  //   name: 'index',
  //   component: () => import('../views/index.vue')
  // },
]
routes.push(...rout)
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
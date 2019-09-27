import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './registerServiceWorker'
import './plugins/element.js'
import echarts from "echarts";
import './style/base.stylus'
import './assets/iconfont/iconfont.css'
import './assets/font/font.css'
import api from './api/api'
import md5 from 'js-md5'


Vue.prototype.$echarts = echarts;
Vue.prototype.$api = api
Vue.prototype.$md5 = md5;
// Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})

// Vue.directive('title', {
//   inserted: function (el, binding) {
//     document.title = el.dataset.title
//   }
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


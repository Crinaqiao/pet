import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import './assets/font/iconfont.css'
import './assets/font/home.css'
import qs from 'qs'
// 定义根路径
// axios.defaults.baseURL = '/api/'
// axios.defaults.baseURL = 'http://101.33.245.89:6002/pet1/'
// 通过axios请求拦截器添加token 保证拥有获取数据的权限
//interceptors.request就是请求拦截器，config是请求对象
axios.interceptors.request.use((config)=>{
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

Vue.config.productionTip = false
// 挂载路由
Vue.prototype.$http = axios

// Vue.prototype.$router = router


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

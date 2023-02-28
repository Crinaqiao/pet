import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/user/Login.vue'
import Register from '../components/user/Register.vue'
import Home from '../components/Home.vue'
import Forum from '../components/Petcounseling/Forum'
// import Text from '../components/test'
import Basicinfo from '../components/userinfo/Basicinfo'
import Dynamic from '../components/userinfo/Dynamic'
import Memner from '../components/member'
import Hairdressing from '../components/service/hairdressing'
import Martyrdom from '../components/service/Martyrdom'
import Adopt  from '../components/service/adopt'
import Data from '../components/Petcounseling/Data'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   redirect: '/test'
  // },
  // {
  //   path: '/test',
  //   component: Text
  // },

  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/home',
    component: Home,
    redirect: '/Forum',
    children: [
      {
        path: '/Forum',
        component: Forum
      },
      {
        path:'/basicinfor',
        component:Basicinfo
      },
      {
        path:'/Dynamic',
        component:Dynamic
      },
      {
        path:'/member',
        component:Memner
      },
      {
        path:'/hairdressing',
        component:Hairdressing
      },
      {
        path:'/martyrdom',
        component:Martyrdom
      },
      {
        path:'/adopt',
        component:Adopt
      },
      {
        path:'/data',
        component:Data
      },
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router

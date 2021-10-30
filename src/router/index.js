import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Home from '@/views/home'
import Qa from '@/views/qa'
import My from '@/views/my'
import Video from '@/views/video'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [{
      path: '',
      name: 'home',
      component: Home
    }, {
      path: '/qa',
      name: 'qa',
      component: Qa
    }, {
      path: '/my',
      name: 'my',
      component: My
    }, {
      path: '/video',
      name: 'video',
      component: Video
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router

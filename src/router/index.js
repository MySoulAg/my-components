import Vue from 'vue'
import VueRouter from 'vue-router'
const Demo = () => import(/* webpackChunkName: "demo" */ '@/views/Demo.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Demo',
    component: Demo
  }
]

const router = new VueRouter({
  routes
})

export default router

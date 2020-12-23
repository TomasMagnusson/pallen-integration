import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import InvoiceSettings from '../views/InvoiceSettings.vue'
import NotFound404Page from '../components/NotFound404Page.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/invoice-settings',
    name: 'invoice-settings',
    component: InvoiceSettings
  },
  {
    path: '/logout',
    component: () => {window.location.href = "/.auth/logout?post_logout_redirect_uri=https://portal.azure.com/SignOut";},
    // beforeEnter: (to, from, next) => {
    //   window.location.href = "/.auth/logout?post_logout_redirect_uri=https://portal.azure.com/SignOut";
    // }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  { path: '*', component: NotFound404Page }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

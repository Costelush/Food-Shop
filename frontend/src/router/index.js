import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import Register from '@/components/Register'
import ListProduct from '@/components/ListProduct'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/add/product',
      name: 'List product',
      component: ListProduct
    }
  ]
})

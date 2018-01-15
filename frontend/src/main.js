// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUi from 'element-ui'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(ElementUi)

const state = {
  baseUrl: 'http://localhost:3000'
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App :state="state"/>',
  data: {
    state: state
  }
})

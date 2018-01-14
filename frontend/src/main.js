import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

const state = {
  bla: 'miau mmiau miau'
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data: {
    state: state
  },
  render: h => h(App)
})

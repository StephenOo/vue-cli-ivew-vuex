import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import 'iview/dist/styles/iview.css'
import '@/icons' // icon
import './permission' // permission control
import iview from './iview'

require('./mock')

Vue.use(router)
Vue.use(iview)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

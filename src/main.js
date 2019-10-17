import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import 'iview/dist/styles/iview.css'
import '@/icons/index'
import iview from './iview'

Vue.use(router)
Vue.use(iview)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

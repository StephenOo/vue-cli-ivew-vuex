import Vue from 'vue';
import { Button } from 'iview';
import App from './App.vue';
import router from './router/router';
import store from './store';
import 'iview/dist/styles/iview.css';

Vue.use(router);

Vue.component('Button', Button);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

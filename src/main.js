import Vue from 'vue';
import { Button } from 'iview';
import App from './App.vue';
import router from './router/router';
import store from './store';
import 'iview/dist/styles/iview.css';
import SvgIcon from '@/components/SvgIcon/index.vue';


Vue.use(router);

Vue.component('Button', Button);
Vue.component('svg-icon', SvgIcon);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

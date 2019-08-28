import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: () => import('@/views/Home'),
    },
    {
      path: '/about',
      name: '详情',
      component: () => import('@/views/About'),
    },
    {
      path: '/login',
      name: '登陆',
      component: () => import('@/views/login/Login'),
    },
  ],
});

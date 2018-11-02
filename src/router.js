import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import SignIn from './views/SignIn.vue';
import Campaigns from './views/Campaigns.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        label: 'Помощь',
      },
    },
    {
      path: '/catalogue',
      name: 'catalogue',
      component: () => import(/* webpackChunkName: "catalogue" */ './views/Catalogue.vue'),
      meta: {
        label: 'Каталог',
      },
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: SignIn,
      meta: {
        label: 'Авторизация',
      },
    },
    {
      path: '/campaigns',
      name: 'campaigns',
      component: Campaigns,
      meta: {
        label: 'Акции',
      },
    },
  ],
});

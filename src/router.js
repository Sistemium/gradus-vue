import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import SignIn from './views/SignIn.vue';
// import Campaigns from './views/Campaigns.vue';

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
      path: '/campaigns/:monthId?/:campaignId?',
      name: 'campaigns',
      component: () => import(/* webpackChunkName: "campaigns" */ './views/Campaigns.vue'),
      meta: {
        label: 'Акции',
      },
    },
    {
      path: '/targets/:groupId?',
      name: 'targets',
      component: () => import(/* webpackChunkName: "salesTargets" */ './views/SalesTargets.vue'),
      meta: {
        label: 'Задачи',
      },
    },
    {
      path: '/possibleOutlets',
      name: 'PossibleOutlets',
      component: () => import(/* webpackChunkName: "outlets" */ './views/PossibleOutletsPage.vue'),
      meta: {
        label: 'Проверка точек',
      },
      children: [{
        name: 'PossibleOutletDialog',
        path: ':outletId',
        component: () => import(/* webpackChunkName: "outlets" */ './views/PossibleOutletDialog.vue'),
      }],
    },
  ],
});

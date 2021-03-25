import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import SignIn from './views/SignIn.vue';
import campaignsRoutes from './routes/campaignsRoutes';
import otherRoutes from './routes/otherRoutes';
import possibleOutletsRoutes from './routes/possibleOutletsRoutes';

Vue.use(Router);

const { VUE_APP_MENU_FIX: menuFix } = process.env;

const redirect = `/${menuFix || ''}`;

export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect,
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: SignIn,
      meta: {
        label: 'Авторизация',
      },
    },
    ...campaignsRoutes,
    ...possibleOutletsRoutes,
    ...otherRoutes,
  ],
});

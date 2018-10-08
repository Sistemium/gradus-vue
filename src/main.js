import Vue from 'vue';

import '@/lib/element-ui';
import '@/lib/sistemium';
import '@/lib/loading';

import Resize from '@/lib/Resize.vue';

import './index.scss';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.component('resize', Resize);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

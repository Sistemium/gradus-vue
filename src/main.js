import Vue from 'vue';

import '@/lib/element-ui';
import '@/lib/sistemium';
import '@/lib/loading';

import './index.scss';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

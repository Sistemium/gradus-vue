import Vue from 'vue';

import '@/lib/element-ui';
import 'intersection-observer';
import '@/lib/v-select';
// import VueObserveVisibility from 'vue-observe-visibility';

import { AUTH_INIT } from 'sistemium-vue/store/auth/actions';

import Resize from '@/lib/Resize.vue';
import ConfirmButton from '@/lib/ConfirmButton.vue';

import './index.scss';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.component('resize', Resize);
Vue.component(ConfirmButton.name, ConfirmButton);
// Vue.use(VueObserveVisibility);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    return store.dispatch(`auth/${AUTH_INIT}`);
  },
}).$mount('#app');

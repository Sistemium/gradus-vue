import Vue from 'vue';

import VueScrollTo from 'vue-scrollto';
import '@/lib/element-ui';
import 'intersection-observer';
import '@/lib/v-select';
import '@/lib/virtual-scroll';
import '@/lib/numberFilter';

import { hideTabBar, isNative } from 'sistemium-vue/services/native';
import { AUTH_INIT } from 'sistemium-vue/store/auth/actions';

import SearchInput from '@/lib/SearchInput.vue';
import Resize from '@/lib/Resize.vue';
import ConfirmButton from '@/lib/ConfirmButton.vue';
import ButtonEdit from '@/components/ButtonEdit.vue';
import ButtonAdd from '@/components/ButtonAdd.vue';

import './index.scss';

import App from './App.vue';
import router from './router';
import store from './store';

import './lib/bindToModel';
import './lib/updateRouteParams';
import './lib/ruDate';
import './lib/authHelpers';

Vue.config.productionTip = false;
Vue.component('resize', Resize);
Vue.component(ConfirmButton.name, ConfirmButton);
Vue.component(SearchInput.name, SearchInput);
Vue.component(ButtonEdit.name, ButtonEdit);
Vue.component(ButtonAdd.name, ButtonAdd);
Vue.use(VueScrollTo);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    if (isNative() && process.env.VUE_APP_NAVBAR_HIDE === 'true') {
      hideTabBar();
    }
    // return store.dispatch(`auth/${AUTH_INIT}`, this.$route.query['access-token']);
    return store.dispatch(`auth/${AUTH_INIT}`);
  },
}).$mount('#app');

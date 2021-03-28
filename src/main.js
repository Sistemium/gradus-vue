import Vue from 'vue';
import VueHead from 'vue-head';

import { sync } from 'vuex-router-sync';
import VueScrollTo from 'vue-scrollto';
import '@/lib/element-ui';
import 'intersection-observer';
import '@/lib/v-select';
import '@/lib/virtual-scroll';
import '@/lib/numberFilter';
import '@/lib/modelExtentions';

import { hideTabBar, isNative } from 'sistemium-vue/services/native';
import { AUTH_INIT } from 'sistemium-vue/store/auth/actions';

import SearchInput from '@/lib/SearchInput.vue';
import Resize from 'sistemium-vue/components/Resize.vue';
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
import './lib/debug';

sync(store, router);

Vue.config.productionTip = false;
Vue.component('resize', Resize);
Vue.component(ConfirmButton.name, ConfirmButton);
Vue.component(SearchInput.name, SearchInput);
Vue.component(ButtonEdit.name, ButtonEdit);
Vue.component(ButtonAdd.name, ButtonAdd);
Vue.use(VueScrollTo);
Vue.use(VueHead);

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

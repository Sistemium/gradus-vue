import Vue from 'vue';
import Vuex from 'vuex';
import auth from 'sistemium-vue/store/auth';
import ormPlugin, { authAxios } from '@/lib/vuex-orm';
import catalogue from './vuex/catalogue';
import campaigns from './vuex/campaigns';
import territory from './vuex/territory';

Vue.use(Vuex);

const store = new Vuex.Store({

  strict: process.env.NODE_ENV !== 'production',

  state: {
    busy: false,
  },

  modules: {
    auth,
    catalogue,
    campaigns,
    territory,
  },

  plugins: [ormPlugin()],

});

export default store;

const unwatch = store.watch(watchAuth, onAuth);

function watchAuth(state) {
  return state.auth;
}

function onAuth({ id: token, account }) {
  if (token) {
    authAxios(token, account);
    unwatch();
  }
}

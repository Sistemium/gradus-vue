import Vue from 'vue';
import Vuex from 'vuex';
import auth from 'sistemium-vue/store/auth';

Vue.use(Vuex);

export default new Vuex.Store({

  strict: process.env.NODE_ENV !== 'production',

  state: {
    busy: false,
  },

  modules: {
    auth,
  },

});

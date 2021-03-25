import Vue from 'vue';
import Vuex from 'vuex';
import auth from 'sistemium-vue/store/auth';
import sharedMutations from 'vuex-shared-mutations';
import catalogue from './vuex/catalogue';
import campaigns from './vuex/campaigns';
import territory from './vuex/territory';


Vue.use(Vuex);

export default new Vuex.Store({

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

  plugins: [sharedMutations({
    predicate: [
      'campaigns/SET_ACTION_OPTION_COPY',
      'campaigns/SET_ACTION_COPY',
      'campaigns/SET_CAMPAIGN_COPY',
    ],
  })],

});

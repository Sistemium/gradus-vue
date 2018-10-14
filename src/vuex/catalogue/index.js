import mutations from './mutations';
import getters from './getters';


export default {

  namespaced: true,

  state: {
    operation: null,
    selectedToShare: [],
  },

  mutations,

  actions: {},

  getters,

};

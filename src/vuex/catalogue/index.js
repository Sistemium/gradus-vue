import mutations from './mutations';
import getters, * as states from './getters';
import actions from './actions';


export default {

  namespaced: true,

  state: {
    [states.SHARED_ARTICLES]: [],
    [states.SELECTED_ARTICLE]: null,
    [states.AVATAR_ARTICLE]: null,
  },

  mutations,
  actions,
  getters,

};

import mutations from './mutations';
import getters, * as states from './getters';
import actions from './actions';


export default {

  namespaced: true,

  state: {
    [states.BUSY]: false,
    [states.SELECTED_MONTH]: '',
    [states.SEARCH_TEXT]: '',
    [states.CAMPAIGNS]: [],
    [states.GALLERY_CAMPAIGN]: null,
    [states.GALLERY_PICTURES]: [],
  },

  mutations,
  actions,
  getters,

};

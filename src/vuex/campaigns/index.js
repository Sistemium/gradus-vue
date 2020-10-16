import mutations from './mutations';
import getters, * as states from './getters';
import actions from './actions';


export default {

  namespaced: true,

  state: {
    [states.ERROR]: null,
    [states.BUSY]: false,
    [states.SELECTED_MONTH]: '',
    [states.SEARCH_TEXT]: '',
    [states.CAMPAIGNS]: [],
    [states.GALLERY_CAMPAIGN]: null,
    [states.GALLERY_PICTURES]: [],
    [states.ACTIVE_GALLERY_PICTURE]: false,
    [states.ACTION_OPTION_COPY]: null,
    [states.ACTION_COPY]: null,
    [states.CAMPAIGN_COPY]: null,
    [states.SHOW_PICTURES]: null,
  },

  mutations,
  actions,
  getters,

};

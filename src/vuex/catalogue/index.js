import mutations from './mutations';
import getters, * as states from './getters';
import actions from './actions';


export default {

  namespaced: true,

  state: {
    [states.GALLERY_PICTURES]: [],
    [states.SHARED_ARTICLES]: [],
    [states.SELECTED_ARTICLE]: null,
    [states.AVATAR_ARTICLE]: null,
    [states.ARTICLE_GROUP]: null,
    [states.SEARCH_TEXT]: '',
    [states.BUSY]: false,
    [states.ACTIVE_GALLERY_PICTURE]: false,
  },

  mutations,
  actions,
  getters,

};

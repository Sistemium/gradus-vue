export const SHARED_ARTICLES = 'selectedToShare';
export const SELECTED_ARTICLE = 'selectedArticle';

export default {

  [SHARED_ARTICLES](state) {
    return state[SHARED_ARTICLES];
  },

  [SELECTED_ARTICLE](state) {
    return state[SELECTED_ARTICLE];
  },

};

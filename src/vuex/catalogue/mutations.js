export const TOGGLE_ARTICLE_SHARE = 'TOGGLE_ARTICLE_SHARE';
export const RESET_SHARED_ARTICLES = 'RESET_SHARED_ARTICLES';
export const TOGGLE_ARTICLE_SELECTED = 'TOGGLE_ARTICLE_SELECTED';

export default {

  [RESET_SHARED_ARTICLES]({ selectedToShare }) {
    if (selectedToShare.length) {
      selectedToShare.splice(0, selectedToShare.length);
    }
  },

  [TOGGLE_ARTICLE_SHARE]({ selectedToShare }, article) {

    const index = selectedToShare.indexOf(article.id);

    if (index >= 0) {
      selectedToShare.splice(index, 1);
    } else {
      selectedToShare.push(article.id);
    }

  },

  [TOGGLE_ARTICLE_SELECTED](state, article) {

    state.selectedArticle = state.selectedArticle === article ? null : article;

  },

};

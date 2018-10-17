import * as g from './getters';

export const TOGGLE_ARTICLE_SHARE = 'TOGGLE_ARTICLE_SHARE';
export const RESET_SHARED_ARTICLES = 'RESET_SHARED_ARTICLES';
export const TOGGLE_ARTICLE_SELECTED = 'TOGGLE_ARTICLE_SELECTED';
export const SET_AVATAR_ARTICLE = `SET_${g.AVATAR_ARTICLE}`;
export const SET_ARTICLE_GROUP = `SET_${g.ARTICLE_GROUP}`;
export const SET_SEARCH_TEXT = `SET_${g.SEARCH_TEXT}`;

export default {

  [SET_AVATAR_ARTICLE](state, article) {
    state[g.AVATAR_ARTICLE] = article ? article.id : null;
  },

  [SET_ARTICLE_GROUP](state, articleGroup = {}) {
    state[g.ARTICLE_GROUP] = articleGroup.id || null;
  },

  [SET_SEARCH_TEXT](state, text) {
    state[g.SEARCH_TEXT] = text || '';
  },

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
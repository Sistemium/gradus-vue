import map from 'lodash/map';
import * as g from './getters';

export const TOGGLE_ARTICLE_SHARE = 'TOGGLE_ARTICLE_SHARE';
export const RESET_SHARED_ARTICLES = 'RESET_SHARED_ARTICLES';

export const SET_AVATAR_ARTICLE = `SET_${g.AVATAR_ARTICLE}`;
export const SET_ARTICLE_GROUP = `SET_${g.ARTICLE_GROUP}`;
export const SET_IMAGE_FILTER = `SET_${g.IMAGE_FILTER}`;
export const SET_SELECTED_DATE = `SET_${g.SELECTED_DATE}`;
export const SET_SEARCH_TEXT = `SET_${g.SEARCH_TEXT}`;
export const SET_GALLERY_PICTURES = `SET_${g.GALLERY_PICTURES}`;
export const SET_BUSY = `SET_${g.BUSY}`;
export const SET_GALLERY_PICTURE = `SET_${g.ACTIVE_GALLERY_PICTURE}`;
export const SET_AVATAR_PICTURE = `SET_${g.AVATAR_PICTURE}`;
export const SET_SELECTED_ARTICLE = `SET_${g.SELECTED_ARTICLE}`;
export const SET_SAME_ARTICLES = `SET_${g.SAME_ARTICLES}`;

export default {

  [SET_GALLERY_PICTURE](state, picture) {
    state[g.ACTIVE_GALLERY_PICTURE] = picture && picture.id;
  },

  [SET_SAME_ARTICLES](state, articles) {
    state[g.SAME_ARTICLES] = map(articles, 'id');
  },

  [SET_BUSY](state, isBusy) {
    state[g.BUSY] = !!isBusy;
  },

  [SET_AVATAR_ARTICLE](state, article) {
    state[g.AVATAR_ARTICLE] = article ? article.id : null;
  },

  [SET_AVATAR_PICTURE](state, picture) {
    state[g.AVATAR_PICTURE] = picture || null;
  },

  [SET_ARTICLE_GROUP](state, articleGroup) {
    state[g.ARTICLE_GROUP] = articleGroup ? articleGroup.id : null;
  },

  [SET_SEARCH_TEXT](state, text) {
    state[g.SEARCH_TEXT] = text || '';
  },

  [SET_GALLERY_PICTURES](state, pictures) {
    state[g.GALLERY_PICTURES] = pictures || [];
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

  [SET_SELECTED_ARTICLE](state, article) {
    state[g.SELECTED_ARTICLE] = article && article.id;
  },

  [SET_IMAGE_FILTER](state) {
    state[g.IMAGE_FILTER] = !state[g.IMAGE_FILTER];
  },

  [SET_SELECTED_DATE](state, date) {
    state[g.SELECTED_DATE] = date;
  },

};

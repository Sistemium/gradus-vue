import debounce from 'lodash/debounce';
import without from 'lodash/without';

import * as svc from '@/services/catalogue';
import * as m from '@/vuex/catalogue/mutations';
import * as g from '@/vuex/catalogue/getters';

import log from 'sistemium-telegram/services/log';

const { debug } = log('vuex:actions');

export const SHARE_WITH_ARTICLE = 'SHARE_WITH_ARTICLE';
export const ARTICLE_AVATAR_CLICK = 'ARTICLE_AVATAR_CLICK';
export const ARTICLE_GROUP_CLICK = 'ARTICLE_GROUP_CLICK';
export const IMAGE_FILTER_TOGGLE = 'IMAGE_FILTER_TOGGLE';
export const SEARCH_TEXT_CHANGE = 'SEARCH_TEXT_CHANGE';
export const ADD_GALLERY_PICTURE = 'ADD_GALLERY_PICTURE';
export const REMOVE_GALLERY_PICTURE = 'REMOVE_GALLERY_PICTURE';
export const SET_PICTURE_AS_AVATAR = 'SET_PICTURE_AS_AVATAR';
export const REMOVE_SAME_ARTICLE = 'REMOVE_SAME_ARTICLE';
export const TOGGLE_ARTICLE_SELECTED = 'TOGGLE_ARTICLE_SELECTED';

export default {

  async [REMOVE_GALLERY_PICTURE]({ commit, getters, dispatch }, picture) {

    const article = getters[g.AVATAR_ARTICLE];
    const pictures = without(getters[g.GALLERY_PICTURES], picture);
    const avatarId = getters[g.AVATAR_PICTURE];

    commit(m.SET_BUSY, true);

    debug(REMOVE_GALLERY_PICTURE, avatarId, picture.id);

    if (avatarId === picture.id) {
      const newAvatar = pictures.length ? pictures[0] : null;
      await dispatch(SET_PICTURE_AS_AVATAR, newAvatar);
    }

    await svc.removeArticlePicture(article, picture);

    commit(m.SET_GALLERY_PICTURES, pictures);

    commit(m.SET_BUSY, false);

  },

  async [REMOVE_SAME_ARTICLE]({ commit, getters }, article) {
    commit(m.SET_BUSY, true);
    await svc.unsetSameArticle(article);
    const selected = getters[g.SELECTED_ARTICLE];
    if (selected) {
      commit(m.SET_SAME_ARTICLES, selected.sameArticles);
    }
    commit(m.SET_BUSY, false);
  },

  async [SHARE_WITH_ARTICLE]({ commit, state: { selectedToShare } }, article) {
    commit(m.SET_BUSY, true);
    await svc.setSameArticle(article, selectedToShare);
    commit(m.RESET_SHARED_ARTICLES);
    commit(m.SET_SAME_ARTICLES, article.sameArticles);
    commit(m.SET_BUSY, false);
  },

  async [SET_PICTURE_AS_AVATAR]({ commit, getters }, picture) {
    await svc.setArticleAvatar(getters[g.AVATAR_ARTICLE], picture);
    commit(m.SET_AVATAR_PICTURE, picture && picture.id);
  },

  [ADD_GALLERY_PICTURE]({ commit, getters }, picture) {

    const pictures = getters[g.GALLERY_PICTURES];

    commit(m.SET_GALLERY_PICTURES, [...pictures, picture]);
    commit(m.SET_GALLERY_PICTURE, picture);

  },

  async [ARTICLE_AVATAR_CLICK]({ commit }, article) {

    if (article) {

      commit(m.SET_BUSY, true);
      commit(m.SET_GALLERY_PICTURES, await svc.getArticlePictures(article));
      commit(m.SET_BUSY, false);

    } else {
      commit(m.SET_GALLERY_PICTURES);
    }

    commit(m.SET_AVATAR_ARTICLE, article || null);
    commit(m.SET_AVATAR_PICTURE, article && article.avatarPictureId);

  },

  [ARTICLE_GROUP_CLICK]({ commit }, articleGroup) {
    commit(m.SET_ARTICLE_GROUP, articleGroup);
  },

  [SEARCH_TEXT_CHANGE]: debounce(({ commit }, text) => {
    commit(m.SET_SEARCH_TEXT, text);
  }, 750),

  [TOGGLE_ARTICLE_SELECTED]({ commit, getters }, article) {
    const selected = getters[g.SELECTED_ARTICLE];
    const isSelected = selected && (selected.id === article.id);
    commit(m.SET_SELECTED_ARTICLE, isSelected ? null : article);
    commit(m.SET_SAME_ARTICLES, isSelected ? null : article.sameArticles);
  },

  [IMAGE_FILTER_TOGGLE]({ commit }) {
    commit(m.SET_IMAGE_FILTER);
  },

};

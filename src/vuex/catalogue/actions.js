import debounce from 'lodash/debounce';

import * as svc from '@/services/catalogue';
import * as m from '@/vuex/catalogue/mutations';
import * as g from '@/vuex/catalogue/getters';

export const SHARE_WITH_ARTICLE = 'SHARE_WITH_ARTICLE';
export const ARTICLE_AVATAR_CLICK = 'ARTICLE_AVATAR_CLICK';
export const ARTICLE_GROUP_CLICK = 'ARTICLE_GROUP_CLICK';
export const SEARCH_TEXT_CHANGE = 'SEARCH_TEXT_CHANGE';
export const ADD_GALLERY_PICTURE = 'ADD_GALLERY_PICTURE';

export default {

  async [SHARE_WITH_ARTICLE]({ commit, state: { selectedToShare } }, article) {
    await svc.setSameArticle(article, selectedToShare);
    commit(m.RESET_SHARED_ARTICLES);
  },

  [ADD_GALLERY_PICTURE]({ commit, getters }, picture) {

    const pictures = getters[g.GALLERY_PICTURES];

    commit(m.SET_GALLERY_PICTURES, [picture, ...pictures]);

  },

  async [ARTICLE_AVATAR_CLICK]({ commit }, article) {

    if (article) {
      const pictures = await svc.getArticlePictures(article);
      commit(m.SET_GALLERY_PICTURES, pictures);
    } else {
      commit(m.SET_GALLERY_PICTURES);
    }

    commit(m.SET_AVATAR_ARTICLE, article || null);

  },

  [ARTICLE_GROUP_CLICK]({ commit }, articleGroup) {
    commit(m.SET_ARTICLE_GROUP, articleGroup);
  },

  [SEARCH_TEXT_CHANGE]: debounce(({ commit }, text) => {
    commit(m.SET_SEARCH_TEXT, text);
  }, 750),

};

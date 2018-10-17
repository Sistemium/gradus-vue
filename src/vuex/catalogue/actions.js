import { setSameArticle } from '@/services/catalogue';
import * as m from '@/vuex/catalogue/mutations';

export const SHARE_WITH_ARTICLE = 'SHARE_WITH_ARTICLE';
export const ARTICLE_AVATAR_CLICK = 'ARTICLE_AVATAR_CLICK';
export const ARTICLE_GROUP_CLICK = 'ARTICLE_GROUP_CLICK';

export default {

  async [SHARE_WITH_ARTICLE]({ commit, state: { selectedToShare } }, article) {
    await setSameArticle(article, selectedToShare);
    commit(m.RESET_SHARED_ARTICLES);
  },

  [ARTICLE_AVATAR_CLICK]({ commit }, article) {
    commit(m.SET_AVATAR_ARTICLE, article || null);
  },

  [ARTICLE_GROUP_CLICK]({ commit }, articleGroup) {
    commit(m.SET_ARTICLE_GROUP, articleGroup);
  },

};

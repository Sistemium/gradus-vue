import { setSameArticle } from '@/services/catalogue';
import { RESET_SHARED_ARTICLES } from '@/vuex/catalogue/mutations';

export const SHARE_WITH_ARTICLE = 'SHARE_WITH_ARTICLE';

export default {

  async [SHARE_WITH_ARTICLE]({ commit, state: { selectedToShare } }, article) {
    await setSameArticle(article, selectedToShare);
    commit(RESET_SHARED_ARTICLES);
  },

};

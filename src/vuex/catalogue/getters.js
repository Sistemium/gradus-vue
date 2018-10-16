import { getArticle } from '@/services/catalogue';

export const SHARED_ARTICLES = 'selectedToShare';
export const SELECTED_ARTICLE = 'selectedArticle';
export const AVATAR_ARTICLE = 'avatarArticle';

export default {

  [SHARED_ARTICLES](state) {
    return state[SHARED_ARTICLES];
  },

  [SELECTED_ARTICLE](state) {
    return state[SELECTED_ARTICLE];
  },

  [AVATAR_ARTICLE](state) {
    const id = state[AVATAR_ARTICLE];
    return id ? getArticle(id) : null;
  },

};

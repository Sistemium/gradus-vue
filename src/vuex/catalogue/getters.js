import * as catalogue from '@/services/catalogue';

export const SHARED_ARTICLES = 'selectedToShare';
export const SELECTED_ARTICLE = 'selectedArticle';
export const AVATAR_ARTICLE = 'avatarArticle';
export const ARTICLE_GROUP = 'articleGroup';
export const SEARCH_TEXT = 'searchText';
export const GALLERY_PICTURES = 'galleryPictures';
export const BUSY = 'BUSY';
export const ACTIVE_GALLERY_PICTURE = 'activeGalleryPicture';

export default {

  [ACTIVE_GALLERY_PICTURE](state) {
    return state[ACTIVE_GALLERY_PICTURE];
  },

  [BUSY](state) {
    return state[BUSY];
  },

  [BUSY](state) {
    return state[BUSY];
  },

  [GALLERY_PICTURES](state) {
    return state[GALLERY_PICTURES];
  },

  [SHARED_ARTICLES](state) {
    return state[SHARED_ARTICLES];
  },

  [SELECTED_ARTICLE](state) {
    return state[SELECTED_ARTICLE];
  },

  [AVATAR_ARTICLE](state) {
    const id = state[AVATAR_ARTICLE];
    return id ? catalogue.getArticle(id) : null;
  },

  [ARTICLE_GROUP](state) {
    const id = state[ARTICLE_GROUP];
    return id ? catalogue.getArticleGroup(id) : null;
  },

  [SEARCH_TEXT](state) {
    return state[SEARCH_TEXT];
  },

};

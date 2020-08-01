import * as svc from '@/services/campaigns';

export const BUSY = 'BUSY';
export const ERROR = 'ERROR';
export const SELECTED_MONTH = 'selectedMonth';
export const SEARCH_TEXT = 'searchText';
export const CAMPAIGNS = 'campaigns';

export const GALLERY_CAMPAIGN = 'galleryCampaign';
export const GALLERY_PICTURES = 'galleryPictures';
export const ACTIVE_GALLERY_PICTURE = 'activeGalleryPicture';
export const ACTION_OPTION_COPY = 'ACTION_OPTION_COPY';
export const ACTION_COPY = 'ACTION_COPY';

export default {

  [ACTION_OPTION_COPY](state) {
    return state[ACTION_OPTION_COPY];
  },

  [ACTION_COPY](state) {
    return state[ACTION_COPY];
  },

  [SELECTED_MONTH](state) {
    return state[SELECTED_MONTH];
  },

  [SEARCH_TEXT](state) {
    return state[SEARCH_TEXT];
  },

  [CAMPAIGNS](state) {
    return svc.getCampaigns(state[CAMPAIGNS]);
  },

  [GALLERY_CAMPAIGN](state) {
    const id = state[GALLERY_CAMPAIGN];
    return id && svc.getCampaign(id);
  },

  [GALLERY_PICTURES](state) {
    return svc.getCampaignPictures(state[GALLERY_PICTURES]);
  },

  [ACTIVE_GALLERY_PICTURE](state) {
    return state[ACTIVE_GALLERY_PICTURE];
  },

  [BUSY](state) {
    return state[BUSY];
  },

  [ERROR](state) {
    return state[ERROR];
  },

};

import * as svc from '@/services/campaigns';

export const BUSY = 'BUSY';
export const SELECTED_MONTH = 'selectedMonth';
export const SEARCH_TEXT = 'searchText';
export const CAMPAIGNS = 'campaigns';

export const GALLERY_CAMPAIGN = 'galleryCampaign';
export const GALLERY_PICTURES = 'galleryPictures';
export const ACTIVE_GALLERY_PICTURE = 'activeGalleryPicture';

export default {

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

};

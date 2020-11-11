import * as svc from '@/services/campaigns';
import filter from 'lodash/filter';

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
export const CAMPAIGN_COPY = 'CAMPAIGN_COPY';
export const FILTERED_CAMPAIGNS = 'filteredCampaigns';

export const SHOW_PICTURES = 'SHOW_PICTURES';


export default {

  [SHOW_PICTURES](state) {
    return state[SHOW_PICTURES];
  },

  [ACTION_OPTION_COPY](state) {
    return state[ACTION_OPTION_COPY];
  },

  [ACTION_COPY](state) {
    return state[ACTION_COPY];
  },

  [CAMPAIGN_COPY](state) {
    return state[CAMPAIGN_COPY];
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

  hasAuthoring(state, getters, rootState, rootGetters) {
    const $hasAuthRole = rootGetters['auth/HAS_ROLE'];
    return $hasAuthRole('actions')
      || $hasAuthRole('tester')
      || $hasAuthRole('admin');
  },

  [FILTERED_CAMPAIGNS](state, { hasAuthoring, campaigns }, rootState) {
    const { campaignGroup: groupCode } = rootState.route.query;
    const predicate = {};
    if (groupCode) {
      predicate.groupCode = groupCode;
    }
    if (!hasAuthoring) {
      predicate.processing = 'published';
    }
    return filter(campaigns, predicate);
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

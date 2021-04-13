import * as svc from '@/services/campaigns';
import filter from 'lodash/filter';
import { currentMonth } from '@/lib/dates';

export const BUSY = 'BUSY';
export const ERROR = 'ERROR';
export const SELECTED_MONTH = 'selectedMonth';
export const IS_MONTH_CLOSED = 'isMonthClosed';
export const SEARCH_TEXT = 'searchText';
export const CAMPAIGNS = 'campaigns';

export const GALLERY_CAMPAIGN = 'galleryCampaign';
export const GALLERY_PICTURES = 'galleryPictures';
export const ACTIVE_GALLERY_PICTURE = 'activeGalleryPicture';
export const ACTION_OPTION_COPY = 'ACTION_OPTION_COPY';
export const ACTION_COPY = 'ACTION_COPY';
export const CAMPAIGN_COPY = 'CAMPAIGN_COPY';
export const FILTERED_CAMPAIGNS = 'filteredCampaigns';
export const CAMPAIGN_VIEW_LAYOUT = 'CAMPAIGN_VIEW_LAYOUT';

export const SHOW_PICTURES = 'SHOW_PICTURES';
export const HAS_AUTHORING = 'hasAuthoring';


export default {

  [CAMPAIGN_VIEW_LAYOUT](state, getters, { route: { query } }) {
    return query.layout || 'list';
  },

  [SHOW_PICTURES](state, { [CAMPAIGN_VIEW_LAYOUT]: layout }) {
    return layout === 'list' && state[SHOW_PICTURES];
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

  [IS_MONTH_CLOSED](state, getters) {
    return currentMonth() > getters[SELECTED_MONTH];
  },

  [SEARCH_TEXT](state) {
    return state[SEARCH_TEXT];
  },

  [CAMPAIGNS](state, getters, rootState) {
    const { path } = rootState.route;
    if (!/^\/campaigns/.test(path)) {
      return [];
    }
    return svc.getCampaigns(state[CAMPAIGNS]);
  },

  [HAS_AUTHORING](state, getters, rootState, rootGetters) {
    const $hasAuthRole = rootGetters['auth/HAS_ROLE'];
    return $hasAuthRole('actions')
      || $hasAuthRole('tester')
      || $hasAuthRole('admin');
  },

  groupCode(state, getters, { route }) {
    return route && route.query.campaignGroup;
  },

  [FILTERED_CAMPAIGNS](state, { hasAuthoring, [CAMPAIGNS]: campaigns, groupCode }) {
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

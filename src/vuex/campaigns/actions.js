import debounce from 'lodash/debounce';
import log from 'sistemium-telegram/services/log';
import without from 'lodash/without';
import * as svc from '@/services/campaigns';
import * as g from '@/vuex/campaigns/getters';

import * as m from './mutations';

const { debug } = log('vuex:actions');

export const SELECT_MONTH = 'SELECT_MONTH';
export const SEARCH_TEXT_CHANGE = 'SEARCH_TEXT_CHANGE';
export const UPDATE_CAMPAIGN = 'UPDATE_CAMPAIGN';
export const CAMPAIGN_AVATAR_CLICK = 'CAMPAIGN_AVATAR_CLICK';
export const SHOW_CAMPAIGN_PICTURE = 'SHOW_CAMPAIGN_PICTURE';
export const ADD_GALLERY_PICTURE = 'ADD_GALLERY_PICTURE';
export const REMOVE_GALLERY_PICTURE = 'REMOVE_GALLERY_PICTURE';
export const REMOVE_CAMPAIGN = 'REMOVE_CAMPAIGN';
export const COPY_ACTION_OPTION = 'COPY_ACTION_OPTION';
export const COPY_ACTION = 'COPY_ACTION';

export default {

  [COPY_ACTION_OPTION]({ commit }, option) {
    commit(m.SET_ACTION_OPTION_COPY, option);
  },

  [COPY_ACTION]({ commit }, option) {
    commit(m.SET_ACTION_COPY, option);
  },

  [SEARCH_TEXT_CHANGE]: debounce(async ({ commit, getters }, searchText) => {

    commit(m.SET_BUSY, true);

    commit(m.SET_SEARCH_TEXT, searchText);

    const date = getters[g.SELECTED_MONTH];

    const campaigns = await svc.campaignsData(date, searchText);

    commit(m.SET_CAMPAIGNS, campaigns);

    commit(m.SET_BUSY, false);

  }, 750),

  async [SELECT_MONTH]({ commit, getters }, date) {

    commit(m.SET_BUSY, true);

    const searchText = getters[g.SEARCH_TEXT];

    const campaigns = await svc.campaignsData(date, searchText);

    commit(m.SET_CAMPAIGNS, campaigns);

    commit(m.SET_SELECTED_MONTH, date);

    commit(m.SET_BUSY, false);
  },

  async [UPDATE_CAMPAIGN]({ commit, getters }, campaign) {

    commit(m.SET_BUSY, true);

    const searchText = getters[g.SEARCH_TEXT];

    const date = getters[g.SELECTED_MONTH];

    const saved = await svc.saveCampaign(campaign);

    const campaigns = await svc.campaignsData(date, searchText);

    commit(m.SET_CAMPAIGNS, campaigns);

    commit(m.SET_BUSY, false);

    return saved;

  },

  async [SHOW_CAMPAIGN_PICTURE]({ commit }, campaignPicture) {

    const { campaign } = campaignPicture || {};

    if (campaign) {
      commit(m.SET_BUSY, true);
      commit(m.SET_GALLERY_PICTURES, await svc.getCampaignPicturesByCampaign(campaign));
      setTimeout(() => {
        commit(m.SET_GALLERY_PICTURE, campaignPicture);
      }, 0);
    } else {
      commit(m.SET_GALLERY_PICTURES);
    }

    commit(m.SET_GALLERY_CAMPAIGN, campaign);
    commit(m.SET_BUSY, false);

  },

  async [CAMPAIGN_AVATAR_CLICK]({ commit }, campaign) {

    if (campaign) {
      commit(m.SET_BUSY, true);
      commit(m.SET_GALLERY_PICTURES, await svc.getCampaignPicturesByCampaign(campaign));
    } else {
      commit(m.SET_GALLERY_PICTURES);
    }

    commit(m.SET_GALLERY_CAMPAIGN, campaign);
    commit(m.SET_BUSY, false);

  },

  [ADD_GALLERY_PICTURE]({ commit, getters }, picture) {

    const galleryPictures = getters[g.GALLERY_PICTURES];

    commit(m.SET_GALLERY_PICTURES, [...galleryPictures, picture]);

    commit(m.SET_GALLERY_PICTURE, picture);

  },

  async [REMOVE_GALLERY_PICTURE]({ commit, getters }, picture) {

    commit(m.SET_BUSY, true);

    const pictures = without(getters[g.GALLERY_PICTURES], picture);

    debug(REMOVE_GALLERY_PICTURE, picture.id);

    await svc.removeCampaignPicture(picture);

    commit(m.SET_GALLERY_PICTURES, pictures);

    commit(m.SET_BUSY, false);

  },

  async [REMOVE_CAMPAIGN]({ commit, getters }, campaign) {

    commit(m.SET_BUSY, true);

    const searchText = getters[g.SEARCH_TEXT];

    const date = getters[g.SELECTED_MONTH];

    await svc.removeCampaign(campaign);

    const campaigns = await svc.campaignsData(date, searchText);

    commit(m.SET_CAMPAIGNS, campaigns);

    commit(m.SET_BUSY, false);

  },

};

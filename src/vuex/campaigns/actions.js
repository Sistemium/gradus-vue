import debounce from 'lodash/debounce';
import * as svc from '@/services/campaigns';
import * as g from '@/vuex/campaigns/getters';

import * as m from './mutations';

export const SELECT_MONTH = 'SELECT_MONTH';
export const SEARCH_TEXT_CHANGE = 'SEARCH_TEXT_CHANGE';
export const UPDATE_CAMPAIGN = 'UPDATE_CAMPAIGN';
export const CAMPAIGN_AVATAR_CLICK = 'CAMPAIGN_AVATAR_CLICK';
export const ADD_GALLERY_PICTURE = 'ADD_GALLERY_PICTURE';

export default {

  [SEARCH_TEXT_CHANGE]: debounce(async ({ commit, getters }, searchText) => {

    commit(m.SET_SEARCH_TEXT, searchText);

    const date = getters[g.SELECTED_MONTH];

    const campaigns = await svc.campaignsData(date, searchText);

    commit(m.SET_CAMPAIGNS, campaigns);

  }, 750),

  async [SELECT_MONTH]({ commit, getters }, date) {

    const searchText = getters[g.SEARCH_TEXT];

    const campaigns = await svc.campaignsData(date, searchText);

    commit(m.SET_CAMPAIGNS, campaigns);

    commit(m.SET_SELECTED_MONTH, date);
  },

  async [UPDATE_CAMPAIGN]({ commit, getters }, campaign) {

    const searchText = getters[g.SEARCH_TEXT];

    const date = getters[g.SELECTED_MONTH];

    await svc.saveCampaign(campaign);

    const campaigns = await svc.campaignsData(date, searchText);

    commit(m.SET_CAMPAIGNS, campaigns);

  },

  async [CAMPAIGN_AVATAR_CLICK]({ commit }, campaign) {

    if (campaign) {

      commit(m.SET_BUSY, true);
      commit(m.SET_GALLERY_PICTURES, await svc.getCampaignPicturesByCampaign(campaign));
      commit(m.SET_BUSY, false);

    } else {
      commit(m.SET_GALLERY_PICTURES);
    }

    commit(m.SET_GALLERY_CAMPAIGN, campaign);

  },

  [ADD_GALLERY_PICTURE]({ commit, getters }, picture) {

    const galleryPictures = getters[g.GALLERY_PICTURES];

    galleryPictures.push(picture);

    commit(m.SET_GALLERY_PICTURES, galleryPictures);

  },

};

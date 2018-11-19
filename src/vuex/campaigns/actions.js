import debounce from 'lodash/debounce';
import * as svc from '@/services/campaigns';
import * as g from '@/vuex/campaigns/getters';

import * as m from './mutations';

export const SELECT_MONTH = 'SELECT_MONTH';
export const SEARCH_TEXT_CHANGE = 'SEARCH_TEXT_CHANGE';
export const UPDATE_CAMPAIGN = 'UPDATE_CAMPAIGN';

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

    await svc.saveCampain(campaign);

    const campaigns = await svc.campaignsData(date, searchText);

    commit(m.SET_CAMPAIGNS, campaigns);

  },
};

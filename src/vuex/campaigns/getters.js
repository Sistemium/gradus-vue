import * as campaign from '@/services/campaigns';

export const SELECTED_MONTH = 'selectedMonth';
export const SEARCH_TEXT = 'searchText';
export const CAMPAIGNS = 'campaigns';

export default {

  [SELECTED_MONTH](state) {
    return state[SELECTED_MONTH];
  },

  [SEARCH_TEXT](state) {
    return state[SEARCH_TEXT];
  },

  [CAMPAIGNS](state) {
    return campaign.getCampaigns(state[CAMPAIGNS]);
  },

};

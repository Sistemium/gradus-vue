import * as campaign from '@/services/campaigns';

export const SELECTED_DATE = 'selectedDate';
export const SEARCH_TEXT = 'searchText';
export const CAMPAIGNS = 'campaigns';

export default {

  [SELECTED_DATE](state) {
    return state[SELECTED_DATE];
  },

  [SEARCH_TEXT](state) {
    return state[SEARCH_TEXT];
  },

  [CAMPAIGNS](state) {
    return campaign.getCampaigns(state[CAMPAIGNS]);
  },

};

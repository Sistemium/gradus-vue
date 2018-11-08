import debounce from 'lodash/debounce';
import * as svc from '@/services/campaigns';

import * as m from './mutations';

export const SELECT_MONTH = 'SELECT_MONTH';
export const SEARCH_TEXT_CHANGE = 'SEARCH_TEXT_CHANGE';

export default {

  [SEARCH_TEXT_CHANGE]: debounce(({ commit }, text) => {
    commit(m.SET_SEARCH_TEXT, text);
  }, 750),

  async [SELECT_MONTH]({ commit }, date) {

    const campaigns = await svc.campaignsData(date);

    commit(m.SET_CAMPAIGNS, campaigns);

    commit(m.SET_SELECTED_MONTH, date);
  },
};

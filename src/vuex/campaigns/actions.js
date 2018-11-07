import debounce from 'lodash/debounce';

import * as m from './mutations';

export const SELECT_DATE = 'SELECT_DATE';
export const SEARCH_TEXT_CHANGE = 'SEARCH_TEXT_CHANGE';

export default {

  [SEARCH_TEXT_CHANGE]: debounce(({ commit }, text) => {
    commit(m.SET_SEARCH_TEXT, text);
  }, 750),

  [SELECT_DATE]({ commit }, date) {
    commit(m.SET_SELECTED_DATE, date);
  },
};

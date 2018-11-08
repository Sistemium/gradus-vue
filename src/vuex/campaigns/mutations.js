import map from 'lodash/map';
import * as g from './getters';

export const SET_SELECTED_DATE = `SET_${g.SELECTED_DATE}`;
export const SET_SEARCH_TEXT = `SET_${g.SEARCH_TEXT}`;
export const SET_CAMPAIGNS = `SET_${g.SEARCH_TEXT}`;

export default {

  [SET_SEARCH_TEXT](state, text) {
    state[g.SEARCH_TEXT] = text || '';
  },

  [SET_SELECTED_DATE](state, date) {
    state[g.SELECTED_DATE] = date;
  },

  [SET_CAMPAIGNS](state, campaigns) {
    state[g.CAMPAIGNS] = map(campaigns, 'id');
  },

};

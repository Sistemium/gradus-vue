import isString from 'lodash/isString';

import * as g from './getters';

export const SET_BUSY = `SET_${g.BUSY}`;
export const SET_SELECTED_MONTH = `SET_${g.SELECTED_MONTH}`;

export default {

  [SET_BUSY](state, isBusy) {
    const msg = `Загрузка данных ${isString(isBusy) ? isBusy : '...'}`;
    state[g.BUSY] = isBusy ? msg : '';
  },

  [SET_SELECTED_MONTH](state, date) {
    state[g.SELECTED_MONTH] = date;
  },

};

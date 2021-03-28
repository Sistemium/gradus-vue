import isString from 'lodash/isString';

import * as g from './getters';

export const SET_BUSY = `SET_${g.BUSY}`;

export default {

  [SET_BUSY](state, isBusy) {
    const msg = `Загрузка данных ${isString(isBusy) ? isBusy : '...'}`;
    state[g.BUSY] = isBusy ? msg : '';
  },

};

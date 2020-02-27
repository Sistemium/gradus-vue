import * as g from './getters';

export const SET_BUSY = `SET_${g.BUSY}`;

export default {

  [SET_BUSY](state, isBusy) {
    state[g.BUSY] = !!isBusy;
  },

};

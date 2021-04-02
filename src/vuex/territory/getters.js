// import * as svc from '@/services/territory';

export const BUSY = 'BUSY';
export const SELECTED_MONTH = 'selectedMonth';

export default {

  [BUSY](state) {
    return state[BUSY];
  },

  [SELECTED_MONTH](state) {
    return state[SELECTED_MONTH];
  },

};

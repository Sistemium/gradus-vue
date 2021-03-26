import log from 'sistemium-debug';
import * as svc from '@/services/territory';

import * as m from './mutations';

const { debug } = log('vuex:actions:territory');

debug('init');

export const LOAD_TERRITORY_DATA = 'LOAD_TERRITORY_DATA';
export const LOAD_OUTLET_STATS = 'LOAD_OUTLET_STATS';

export default {

  async [LOAD_TERRITORY_DATA]({ commit }) {

    commit(m.SET_BUSY, true);

    await svc.loadTerritory();

    commit(m.SET_BUSY, false);

  },

  async [LOAD_OUTLET_STATS]({ commit }, filter) {

    commit(m.SET_BUSY, true);

    await svc.loadSalesmen();
    await svc.loadOutletStats(filter.dateB, filter.dateE);

    commit(m.SET_BUSY, false);

  },

};

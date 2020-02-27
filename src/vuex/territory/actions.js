import log from 'sistemium-telegram/services/log';
import * as svc from '@/services/territory';

import * as m from './mutations';

const { debug } = log('vuex:actions:territory');

debug('init');

export const LOAD_TERRITORY_DATA = 'REMOVE_CAMPAIGN';

export default {

  async [LOAD_TERRITORY_DATA]({ commit }) {

    commit(m.SET_BUSY, true);

    await svc.loadTerritory();

    commit(m.SET_BUSY, false);

  },

};

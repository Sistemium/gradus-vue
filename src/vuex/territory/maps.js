import { createNamespacedHelpers } from 'vuex';

import * as g from './getters';
import * as a from './actions';

const { mapActions, mapGetters } = createNamespacedHelpers('territory');

export const territoryActions = mapActions({
  loadTerritoryData: a.LOAD_TERRITORY_DATA,
});

export const territoryGetters = mapGetters({
  busy: g.BUSY,
});

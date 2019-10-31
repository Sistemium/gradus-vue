<template lang="pug">

.possible-outlets-page

  el-container(
    v-loading="loading"
    element-loading-text="Загрузка данных ..."
  )

    el-aside(v-if="!loading")
      resize(:padding="30")

        salesman-grouped-list(:grouped-items="filteredSalesman" v-model="currentSalesman")

    el-main()
      resize(:padding="30")

        salesman-outlets-list(:outlets="outlets")

</template>
<script>

import store from '@/store';
import * as a from '@/vuex/territory/actions';
import { territoryGetters } from '@/vuex/territory/maps';
import * as svc from '@/services/territory';
import SalesmanGroupedList from '@/components/territory/SalesmanGroupedList.vue';
import SalesmanOutletsList from '@/components/territory/SalesmanOutletsList.vue';

const NAME = 'PossibleOutletsPage';

export default {
  data() {
    return {
      filteredSalesman: [],
      currentSalesman: null,
      outlets: [],
    };
  },

  computed: {
    loading: territoryGetters.busy,
  },

  async created() {
    await store.dispatch(`territory/${a.LOAD_TERRITORY_DATA}`);
    this.filteredSalesman = svc.groupedSalesman();
    this.$watch('currentSalesman.id', currentSalesmanId => {
      this.outlets = svc.possibleOutlets(currentSalesmanId);
    });
  },

  components: {
    SalesmanOutletsList,
    SalesmanGroupedList,
  },

  name: NAME,

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.el-main {
  padding: 0;
  margin-left: $margin-top;
}

</style>

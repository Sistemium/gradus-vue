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

        h3
          span(v-if="currentSalesman") {{ currentSalesman.name }}
          span(v-else) Никому не назначено
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

  methods: {
    onSalesmanId(salesmanId) {
      this.outlets = svc.possibleOutlets(salesmanId);
      if (salesmanId) {
        this.$router.push({
          name: 'SalesGroupPossibleOutlets',
          params: { salesmanId },
        });
      } else {
        this.$router.push({
          name: 'PossibleOutlets',
        });
      }
    },
  },

  async created() {

    await store.dispatch(`territory/${a.LOAD_TERRITORY_DATA}`);
    this.filteredSalesman = svc.groupedSalesman();
    const { salesmanId } = this.$route.params;

    if (salesmanId) {
      this.currentSalesman = svc.salesmanById(salesmanId);
    }

    this.$watch('currentSalesman.id', this.onSalesmanId, { immediate: true });

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

h3 {
  position: sticky;
  top: 0;
  background-color: white;
  margin-bottom: 0;
  padding-bottom: 15px;
  font-weight: bold;
}
</style>

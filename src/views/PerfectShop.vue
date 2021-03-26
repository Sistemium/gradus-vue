<template lang="pug">

.perfect-shop

  el-container(
    v-loading="loading"
    element-loading-text="Загрузка данных ..."
  )

    el-aside(v-if="!loading")
      resize(:padding="30")

        search-input(v-model="searchText" placeholder="поиск точек или ТП")
        salesman-grouped-list(
          v-if="filteredSalesman.length"
          :grouped-items="filteredSalesman"
          v-model="currentSalesman"
        )

        .list-group(v-else)
          .list-group-item
            i.el-icon-warning
            span Нет подходящих ТП

    el-main()
      resize(:padding="30")

        template(v-if="currentSalesman")
          h3
            .name {{ currentSalesman.name }}
            .level Уровень
            .progress Блоки
            .progress Ассортимент
          perfect-shop-stats-list(
            v-if="currentSalesman"
            :stats="outlets"
            @click="onOutletClick"
          )

        el-alert(v-else title="Выберите ТП" type="warning")

    router-view

</template>
<script>

import * as svc from '@/services/territory';
import store from '@/store';
import * as a from '@/vuex/territory/actions';
import find from 'lodash/find';
import noop from 'lodash/noop';
import flatMap from 'lodash/flatMap';
import SalesmanOutletsList from '@/components/territory/SalesmanOutletsList.vue';
import SalesmanGroupedList from '@/components/territory/SalesmanGroupedList.vue';
import { territoryGetters } from '@/vuex/territory/maps';
import PerfectShopStatsList from '@/components/perfectShop/PerfectShopStatsList.vue';

const NAME = 'PerfectShop';

const dateB = '2021-03-01';
const dateE = '2021-03-31';

export default {

  name: NAME,

  data() {
    return {
      currentSalesman: null,
      searchText: '',
      dateB,
      dateE,
    };
  },

  head: {
    style: [
      {
        type: 'text/css',
        inner: '@page { size: A4 portrait; }',
        undo: true,
      },
    ],
  },

  computed: {

    loading: territoryGetters.busy,

    outlets() {
      noop(this.searchText);
      const { currentSalesman } = this;
      return currentSalesman ? currentSalesman.outlets : [];
    },

    filteredSalesman() {
      const fn = salesmanId => svc.outletStatsBySalesmanId(salesmanId, this.dateB, this.dateE);
      return svc.groupedSalesman(this.searchText, fn);
    },

  },

  methods: {

    onSalesmanId(salesmanId) {
      this.updateRouteParams({}, { salesmanId });
    },

    onOutletClick(outlet) {
      this.$router.push({
        name: 'PerfectShopStatsDialog',
        params: { statId: outlet.id },
        query: this.$route.query,
      });
    },

  },

  async created() {

    await store.dispatch(`territory/${a.LOAD_OUTLET_STATS}`, {
      dateB,
      dateE,
    });

    const { salesmanId } = this.$route.query;

    if (salesmanId) {
      const men = flatMap(this.filteredSalesman, 'items');
      this.currentSalesman = find(men, { id: salesmanId });
    }

    this.$watch('currentSalesman.id', this.onSalesmanId, { immediate: true });
  },

  components: {
    PerfectShopStatsList,
    SalesmanOutletsList,
    SalesmanGroupedList,
  },

};

</script>
<style scoped lang="scss">

@import "../styles/masterPage";

h3 {
  display: flex;
  flex-direction: row;
  align-items: center;

  .name {
    flex: 1;
  }

  .level, .progress {
    font-size: 11px;
    width: 80px;
    text-align: center;
  }

  padding-right: $margin-top + 1;
}

</style>

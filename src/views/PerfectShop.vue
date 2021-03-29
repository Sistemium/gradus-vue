<template lang="pug">

.perfect-shop

  el-container(
    v-loading="loading"
    :element-loading-text="loading"
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
          h3.header
            .name {{ currentSalesman.name }}
            .level Уровень
            .progress Блоки
            .progress Ассортимент
          perfect-shop-stats-list(
            v-if="outlets.length"
            :stats="outlets"
            @click="onOutletClick"
          )

        //el-alert(v-else title="Выберите ТП" type="warning")
        template(v-else)
          h3.header
            .name Близкие к достижению целей точки
            .level Уровень
            .progress Блоки
            .progress Ассортимент
          .salesman-group(v-for="group in readyStats" :key="group.id")
            .salesman(v-for="salesman in group.items" :key="salesman.id")
              h3.salesman
                .name {{ salesman.name }}
              perfect-shop-stats-list(
                :stats="salesman.outlets"
                @click="onOutletClick"
              )

    router-view(v-if="!loading")

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

    readyStats() {

      const data = this.filteredSalesman.map(group => {
        const { items } = group;
        const mappedItems = items.map(salesmanItem => {
          const { outlets } = salesmanItem;
          return {
            ...salesmanItem,
            outlets: outlets.filter(o => o.level || o.close),
          };
        });
        return {
          ...group,
          items: mappedItems.filter(({ outlets }) => outlets.length),
        };
      });

      return data.filter(({ items }) => items.length);

    },

    filteredSalesman() {

      if (this.loading) {
        return [];
      }

      const fn = salesmanId => svc.outletStatsBySalesmanId(salesmanId, this.dateB, this.dateE);
      return svc.groupedSalesman(this.searchText, fn);
    },

  },

  methods: {

    onSalesmanId(salesmanId) {
      this.updateRouteParams({}, { salesmanId });
    },

    onRouteChange(salesmanId) {
      const { id } = this.currentSalesman || {};
      if (salesmanId && salesmanId !== id) {
        const men = flatMap(this.filteredSalesman, 'items');
        this.currentSalesman = find(men, { id: salesmanId });
      } else if (this.currentSalesman && !salesmanId) {
        this.currentSalesman = null;
      }
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

    this.$watch('$route.query.salesmanId', this.onRouteChange, { immediate: true });
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

h3.header {

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

h3.salesman {
  font-weight: bold;
  margin-top: $margin-top;
}

</style>

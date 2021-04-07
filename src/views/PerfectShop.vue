<template lang="pug">

.perfect-shop

  el-container(
    v-loading="loading"
    :element-loading-text="loading"
  )

    //perfect-shop-aside(v-if="!loading")

    el-aside(v-if="!loading")

      search-input(v-model="searchText" placeholder="поиск точек или ТП")

      month-select(
        :months="lastYearMonths"
        v-model="selectedMonth"
        placeholder="период акции"
      )

      resize(:padding="30")

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
            .name
              span {{ currentSalesman.name }}
              download-excel-button(
                :data-fn="downloadExcelData"
                :name="downloadExcelFileName"
              )
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
            .name
              span Близкие к достижению целей точки
              download-excel-button(
                :data-fn="downloadExcelData"
                :name="downloadExcelFileName"
              )
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

import * as ps from '@/services/perfectShop';
import * as svc from '@/services/territory';
import store from '@/store';
import * as a from '@/vuex/territory/actions';
import * as g from '@/vuex/territory/getters';
import find from 'lodash/find';
import noop from 'lodash/noop';
import flatMap from 'lodash/flatMap';
import SalesmanOutletsList from '@/components/territory/SalesmanOutletsList.vue';
import { territoryGetters } from '@/vuex/territory/maps';
import PerfectShopStatsList from '@/components/perfectShop/PerfectShopStatsList.vue';
import MonthSelect from '@/components/MonthSelect.vue';
import SalesmanGroupedList from '@/components/territory/SalesmanGroupedList.vue';
import { dateBE, monthGenerator } from '@/lib/dates';
import { createNamespacedHelpers } from 'vuex';
import DownloadExcelButton from '@/lib/DownloadExcelButton.vue';
// import PerfectShopAside from '@/components/perfectShop/PerfectShopAside.vue';

const {
  mapActions,
  mapGetters,
} = createNamespacedHelpers('territory');

const NAME = 'PerfectShop';

export default {

  name: NAME,

  data() {
    return {
      currentSalesman: null,
      searchText: '',
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

    selectedMonth: {
      ...mapGetters({ get: g.SELECTED_MONTH }),
      ...mapActions({ set: a.SELECT_MONTH }),
    },

    loading: territoryGetters.busy,

    downloadExcelFileName() {
      const { currentSalesman } = this;
      if (!currentSalesman) {
        return `PS ${this.selectedMonth} лучшие точки`;
      }
      return `PS ${this.selectedMonth} ${currentSalesman.name}`;
    },

    lastYearMonths() {
      return monthGenerator(12, Date(), 0);
    },

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

      const {
        dateB,
        dateE,
      } = dateBE(this.selectedMonth);

      const fn = salesmanId => svc.outletStatsBySalesmanId(salesmanId, dateB, dateE);
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
      const params = { statId: outlet.id };
      this.updateRouteParams(params, {}, 'PerfectShopStatsDialog');
    },

    downloadExcelData() {
      const { currentSalesman } = this;
      const schema = ps.downloadResultsSchema();
      const data = currentSalesman ? this.outlets : ps.mapDownloadReadyStats(this.readyStats);
      if (!currentSalesman) {
        schema.columns.splice(0, 0, {
          key: 'salesman',
          title: 'ТП',
          width: 30,
        });
      }
      return {
        schema,
        data,
      };
    },

  },

  created() {

    this.$watch('$route.query.salesmanId', this.onRouteChange, { immediate: true });
    this.$watch('currentSalesman.id', this.onSalesmanId, { immediate: true });
    this.$watchImmediate('$route.params.monthId', monthId => {
      this.selectedMonth = monthId || this.selectedMonth || this.lastYearMonths[0].id;
      if (!monthId) {
        this.updateRouteParams({ monthId: this.selectedMonth }, {}, 'PerfectShop');
      }
    });

  },

  watch: {
    async selectedMonth(monthId) {

      await this.updateRouteParams({ monthId });

      const {
        dateB,
        dateE,
      } = dateBE(this.selectedMonth);

      await store.dispatch(`territory/${a.LOAD_OUTLET_STATS}`, {
        dateB,
        dateE,
      });

    },
  },

  components: {
    DownloadExcelButton,
    // PerfectShopAside,
    PerfectShopStatsList,
    SalesmanOutletsList,
    SalesmanGroupedList,
    MonthSelect,
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

.month-select {
  width: 100%;
  margin-bottom: $margin-top;
}

.download-excel-button {
  margin-left: $padding;
}

</style>

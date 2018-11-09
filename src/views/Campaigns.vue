<template lang="pug">

el-container.campaigns(
no-v-loading.fullscreen.lock="loading || busy"
element-loading-text="Загрузка данных ..."
)

  el-header.campaigns-header(height="")

    .month
      strong Период:

      el-select.select(v-model="selectedMonth" placeholder="выберите")
        el-option(
        v-for="month in lastYearMonths"
        :key="month.id"
        :label="month.label"
        :value="month.id"
        )

    el-input.searcher(
    prefix-icon="el-icon-search"
    v-model="searchText"
    :clearable="true"
    placeholder="поиск"
    )

  el-container.campaigns-main(
  v-loading="loading"
  element-loading-text="Загрузка данных ..."
  )

    el-table(
    :data="campaigns"
    v-if="!loading"
    )
      el-table-column(
      prop="name"
      label="Название"
      )
      el-table-column(
      prop="dateB"
      label="Дата начала"
      )
      el-table-column(
      prop="dateE"
      label="Дата окончания"
      )

</template>

<script>

import { createNamespacedHelpers } from 'vuex';

import * as getters from '@/vuex/campaigns/getters';
import * as actions from '@/vuex/campaigns/actions';

import { monthGenerator } from 'sistemium-telegram/services/moments';

const { mapActions, mapGetters } = createNamespacedHelpers('campaigns');

export default {

  name: 'Campaigns',

  data() {
    return {
      loading: false,
    };
  },

  computed: {

    lastYearMonths() {

      return monthGenerator(12, Date());

    },

    ...mapGetters({ campaigns: getters.CAMPAIGNS }),

    selectedMonth: {
      ...mapGetters({ get: getters.SELECTED_MONTH }),
      ...mapActions({ set: actions.SELECT_MONTH }),
    },
    searchText: {
      ...mapGetters({ get: getters.SEARCH_TEXT }),
      ...mapActions({ set: actions.SEARCH_TEXT_CHANGE }),
    },

  },

};

</script>

<style scoped lang="scss">

@import "../styles/variables";

.select {

  margin-left: 10px;

}

.campaigns-header {

  height: 70px;
  margin-top: -20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 0;
  padding-left: 3px;
  justify-content: space-between;

  strong {
    margin-left: $margin-right;
  }

}

.searcher {

  max-width: 200px;

}

</style>

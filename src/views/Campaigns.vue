<template lang="pug">

el-container.campaigns(
no-v-loading.fullscreen.lock="loading || busy"
element-loading-text="Загрузка данных ..."
)

  el-header.catalogue-header(height="")

    strong Период:

    el-select.select(v-model="selectedDate")
      el-option(
      v-for="month in lastYearMonths"
      :key="month.id"
      :label="month.label"
      :value="month.id"
      )

  el-container.catalogue-main(
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

import * as svc from '@/services/campaigns';

import { monthGenerator } from 'sistemium-telegram/services/moments';

const { mapActions, mapGetters } = createNamespacedHelpers('campaigns');

export default {

  name: 'Campaigns',


  data() {
    return {
      campaigns: [],
      loading: false,
    };
  },

  computed: {

    lastYearMonths() {

      return monthGenerator(12, Date());

    },

    ...mapGetters({ campaigns: getters.CAMPAIGNS }),

    selectedDate: {
      ...mapGetters({ get: getters.SELECTED_DATE }),
      ...mapActions({ set: actions.SELECT_DATE }),
    },
    searchText: {
      ...mapGetters({ get: getters.SEARCH_TEXT }),
      ...mapActions({ set: actions.SEARCH_TEXT_CHANGE }),
    },

  },

  methods: {

    async bindCampaigns() {

      this.loading = true;

      this.campaigns = await svc.campaignsData(
        this.searchText,
        this.selectedDate,
      );

      console.log(this.selectedDate);

      this.loading = false;

    },

  },

  async created() {
    this.$watch('selectedDate', this.bindCampaigns, { immediate: true });
  },
};

</script>

<style scoped lang="scss">

.select{

  margin-left: 10px;

}

</style>

<template lang="pug">

  el-select(v-model="selectedDate")
    el-option(
    v-for="month in lastYearMonths"
    :key="month.label"
    :label="month.label"
    :value="month.label"
    )

  <!--el-input.searcher(-->
  <!--prefix-icon="el-icon-search"-->
  <!--v-model="searchText"-->
  <!--:clearable="true"-->
  <!--placeholder="поиск"-->
  <!--)-->

</template>

<script>

import { createNamespacedHelpers } from 'vuex';

import * as getters from '@/vuex/catalogue/getters';
import * as actions from '@/vuex/catalogue/actions';

import * as svc from '@/services/campaigns';

import { monthGenerator } from 'sistemium-telegram/services/moments';

const { mapActions, mapGetters } = createNamespacedHelpers('catalogue');

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
        '2018-11',
      );

      this.loading = false;

    },

  },

  async created() {
    this.$watch('searchText', this.bindCampaigns, { immediate: true });
  },
};

</script>

<style scoped lang="scss">

</style>

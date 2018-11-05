<template lang="pug">

  el-select(v-model="selectedDate")
    el-option(
    v-for="month in lastYearMonths"
    :key="month"
    :label="month"
    :value="month"
    )

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

  },

  methods: {

    bindCurrent() {

      // const data = svc.campaignsData(
      //   this.searchText,
      //   this.selectedDate,
      // );
      //
      // this.campaigns = data.campaigns;

    },

  },

  async created() {
    this.loading = true;
    await svc.loadData();
    this.loading = false;
    this.$watch('searchText', this.bindArticles, { immediate: true });
  },
};

</script>

<style scoped lang="scss">

</style>

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

import { monthGenerator } from 'sistemium-telegram/services/moments';

const { mapActions, mapGetters } = createNamespacedHelpers('catalogue');

export default {

  name: 'Campaigns',

  computed: {

    lastYearMonths() {

      return monthGenerator(12, Date());

    },

    selectedDate: {
      ...mapGetters({ get: getters.SELECTED_DATE }),
      ...mapActions({ set: actions.SELECT_DATE }),
    },

  },
};

</script>

<style scoped lang="scss">

</style>

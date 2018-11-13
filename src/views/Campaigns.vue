<template lang="pug">

el-container.campaigns(
no-v-loading.fullscreen.lock="loading || busy"
element-loading-text="Загрузка данных ..."
)

  el-header.campaigns-header(height="")

    .filter

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

    el-button(@click="newCampaignVisible = true") Добавить акцию

    el-dialog.campaign-input(
      title="Новая Акция"
      :visible.sync="newCampaignVisible"
      :before-close="closeDialog"
    )

      label Название *

      el-input(v-model="newCampaign.name")

      label Дата начала *

      el-date-picker(v-model="newCampaign.dateB")

      label Дата окончания *

      el-date-picker(v-model="newCampaign.dateE")

      label Описание

      el-input(v-model="newCampaign.commentText" type="textarea" autosize)

      span(slot="footer" class="dialog-footer")
        el-button(@click="closeDialog") Отмена
        el-button(type="primary" @click="closeDialog") Готово

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
      newCampaignVisible: false,
      newCampaign: {},
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

  methods: {

    closeDialog() {

      this.newCampaignVisible = false;

      this.newCampaign = {};

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

  margin-left: 10px;
  max-width: 200px;

}

.campaign-input{

  .el-input{

    padding: 12px 6px;
    display: block;
    width: 100%;

  }

  .el-textarea{

    padding: 12px 6px;
    width: 100%;

  }

  label{

    padding: 6px;

  }

}

</style>

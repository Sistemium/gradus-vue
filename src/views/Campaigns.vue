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

  el-container.campaigns-main(
  v-loading="loading"
  element-loading-text="Загрузка данных ..."
  )

    el-table(
    :data="campaigns"
    v-if="!loading"
    @cell-click="campaignClick"
    )
      el-table-column(
      prop="name"
      label="Название"
      @click="campaignAvatarClick()"
      )
      el-table-column(
      :formatter="dateBFormatter"
      label="Дата начала"
      )
      el-table-column(
      :formatter="dateEFormatter"
      label="Дата окончания"
      )

  el-dialog.campaign-input(
  title="Новая Акция"
  :visible.sync="newCampaignVisible"
  :before-close="closeDialog"
  )

    label Название *

    el-input(v-model="newCampaign.name")

    label Дата начала *

    el-date-picker(
    v-model="newCampaign.dateB"
    :picker-options = "{ disabledDate: disableMinDate }"
    format="yyyy/MM/dd"
    value-format="yyyy-MM-dd"
    )

    label Дата окончания *

    el-date-picker(
    v-model="newCampaign.dateE"
    :picker-options= "{ disabledDate: disableMaxDate }"
    format="yyyy/MM/dd"
    value-format="yyyy-MM-dd"
    )

    label Описание

    el-input(v-model="newCampaign.commentText" type="textarea" :rows="4" resize="none")

    span(slot="footer" class="dialog-footer")
      el-button(@click="closeDialog") Отмена
      el-button(type="primary" @click="submitDialog") Готово

  campaign-pictures-dialog(
  v-if="galleryCampaign"
  :campaign="galleryCampaign"
  @closed="campaignAvatarClick()"
  )

</template>

<script>

import { createNamespacedHelpers } from 'vuex';
import CampaignPicturesDialog from '@/components/CampaignPicturesDialog.vue';

// import log from 'sistemium-telegram/services/log';

import * as getters from '@/vuex/campaigns/getters';
import * as actions from '@/vuex/campaigns/actions';

import { monthGenerator, longDate } from 'sistemium-telegram/services/moments';

const { mapActions, mapGetters } = createNamespacedHelpers('campaigns');

// const { debug } = log('Campaigns');

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

    ...mapGetters({
      campaigns: getters.CAMPAIGNS,
      galleryCampaign: getters.GALLERY_CAMPAIGN,
    }),

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

    ...mapActions({
      updateCampaign: actions.UPDATE_CAMPAIGN,
      campaignAvatarClick: actions.CAMPAIGN_AVATAR_CLICK,
    }),

    campaignClick(row) {
      this.campaignAvatarClick(row);
    },

    closeDialog() {

      this.newCampaignVisible = false;

      this.newCampaign = {};

    },

    async submitDialog() {

      this.updateCampaign({
        ...this.newCampaign,
        isActive: true,
      });

      this.closeDialog();

    },

    disableMinDate(date) {

      return !!(this.newCampaign.dateE && date > new Date(this.newCampaign.dateE));

    },

    disableMaxDate(date) {

      return !!(this.newCampaign.dateB && date < new Date(this.newCampaign.dateB));

    },

    dateBFormatter(date) {

      return longDate(date.dateB);

    },

    dateEFormatter(date) {

      return longDate(date.dateE);

    },

  },

  components: { CampaignPicturesDialog },

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

.campaign-input {

  .el-input {

    padding: 12px 6px;
    display: block;
    width: 100%;

  }

  .el-textarea {

    padding: 12px 6px;
    width: 100%;

  }

  label {

    padding: 6px;

  }

}

</style>

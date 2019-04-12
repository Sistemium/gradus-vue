<template lang="pug">

el-container.campaigns(
no-v-loading.fullscreen.lock="loading || busy"
element-loading-text="Загрузка данных ..."
)

  el-header.campaigns-header(height="")

    .filter

      label Период:

      month-select(:months="lastYearMonths" v-model="selectedMonth")

      el-input.searcher(
      prefix-icon="el-icon-search"
      v-model="searchText"
      :clearable="true"
      placeholder="поиск"
      )

    el-button(type="primary" @click="campaign = {}") Добавить акцию

  el-container.campaigns-main(
  v-loading="loading"
  element-loading-text="Загрузка данных ..."
  )

    resize.resize(padding="30")
      campaigns-table(v-if="!loading" :campaigns="campaigns" @cell-click="campaignClick")

  campaign-dialog(
  v-if="campaign"
  :campaign="campaign"
  @closed="editCampaignClose()"
  @submit="editCampaign"
  @remove="removeCampaign"
  )

  campaign-pictures-dialog(
  v-if="galleryCampaign"
  :campaign="galleryCampaign"
  @closed="onGalleryClosed"
  )

</template>

<script>

import { createNamespacedHelpers } from 'vuex';
import MonthSelect from '@/components/MonthSelect.vue';
import CampaignPicturesDialog from '@/components/campaigns/CampaignPicturesDialog.vue';
import CampaignDialog from '@/components/campaigns/CampaignDialog.vue';
import CampaignsTable from '@/components/campaigns/CampaignsTable.vue';

// import log from 'sistemium-telegram/services/log';

import * as getters from '@/vuex/campaigns/getters';
import * as actions from '@/vuex/campaigns/actions';

import { monthGenerator } from 'sistemium-telegram/services/moments';

const { mapActions, mapGetters } = createNamespacedHelpers('campaigns');

// const { debug } = log('Campaigns');

export default {

  name: 'Campaigns',

  data() {
    return {
      loading: false,
      campaign: undefined,
    };
  },

  computed: {

    lastYearMonths() {
      return monthGenerator(12, Date());
    },

    ...mapGetters({
      campaigns: getters.CAMPAIGNS,
      galleryCampaign: getters.GALLERY_CAMPAIGN,
      busy: getters.BUSY,
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
      campaignAvatarClick: actions.CAMPAIGN_AVATAR_CLICK,
      updateCampaign: actions.UPDATE_CAMPAIGN,
      removeCampaign: actions.REMOVE_CAMPAIGN,
    }),

    editCampaignClose() {
      this.campaign = undefined;
    },

    editCampaign(campaign) {

      this.updateCampaign({
        ...campaign,
        isActive: true,
      });

    },

    campaignClick(row, column) {

      if (column.label === 'Картинки') {
        this.campaignAvatarClick(row);
      } else {
        this.campaign = row;
      }

    },

    onGalleryClosed() {
      this.campaignAvatarClick();
      this.$nextTick(() => {
        this.$forceUpdate();
      });
    },

  },

  watch: {
    busy(isBusy) {
      const { message: currentMessage } = this;
      if (currentMessage) {
        currentMessage.close();
      }
      if (isBusy) {
        this.message = this.$message({
          message: 'Загрузка данных ...',
          type: 'warning',
          duration: 0,
        });
      }
    },
  },

  components: {
    CampaignDialog,
    CampaignPicturesDialog,
    CampaignsTable,
    MonthSelect,
  },

};

</script>

<style scoped lang="scss">

@import "../styles/variables";

.month-select {
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

  label {
    margin-left: $margin-right;
    font-weight: bold;
  }

}

.resize {
  display: block;
  width: 100%;
}

.searcher {

  margin-left: 10px;
  max-width: 200px;

}

</style>

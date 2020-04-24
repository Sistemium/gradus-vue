<template lang="pug">

el-container.campaigns(
  no-v-loading.fullscreen.lock="loading || busy"
  element-loading-text="Загрузка данных ..."
)

  el-header.campaigns-header(height="")

    .filter

      .period
        label Период:
        month-select(:months="lastYearMonths" v-model="selectedMonth")

      search-input(v-model="searchText")

    el-button.add-campaign(type="primary" @click="campaign = {}")
      i.el-icon-document-add
      span Добавить акцию

  el-container.campaigns-main(
    v-loading="loading"
    element-loading-text="Загрузка данных ..."
  )

    resize.resize(:padding="30")
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

  created() {
    if (!this.selectedMonth) {
      this.selectedMonth = this.lastYearMonths[0].id;
    }
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
@import "../styles/responsive";

.month-select {
  @include responsive-only(gt-xs) {
    margin-left: 10px;
  }
}

.campaigns-header {

  margin-top: -10px;
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

  .filter {
    display: flex;
    @include responsive-only(xxs) {
      flex-direction: column;
    }
  }

  .period {
    @include responsive-only(lt-sm) {
      label {
        display: none;
      }
    }
  }

}

.resize {
  display: block;
  width: 100%;
}

.search-input {

  margin-left: 10px;
  max-width: 200px;

}

.add-campaign {

  @include responsive-only(lt-sm) {
    span {
      display: none;
    }
    padding: $padding;
  }

  @include responsive-only(gt-xs) {
    i {
      display: none;
    }
  }

  i {
    font-size: 25px;
  }
}

</style>

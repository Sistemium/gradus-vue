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

    el-button(@click="campaign = {}") Добавить акцию

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
      )
      el-table-column(
      :formatter="dateBFormatter"
      label="Дата начала"
      )
      el-table-column(
      :formatter="dateEFormatter"
      label="Дата окончания"
      )
      el-table-column(
      width="90"
      label="Картинки"
      )
        template(slot-scope="scope")
          <!--img(v-if="imageSrc" :src="imageSrc")-->
          img.placeholder(src="/images/placeholder.png")

  campaign-dialog(
  v-if="campaign"
  :campaign="campaign"
  @closed="editCampaingClose()"
  @submit="editCampaing"
  @remove="removeCampaign"
  )

  campaign-pictures-dialog(
  v-if="galleryCampaign"
  :campaign="galleryCampaign"
  @closed="campaignAvatarClick()"
  )

</template>

<script>

import { createNamespacedHelpers } from 'vuex';
import CampaignPicturesDialog from '@/components/CampaignPicturesDialog.vue';
import CampaignDialog from '@/components/CampaignDialog.vue';

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

    dateBFormatter(date) {

      return longDate(date.dateB);

    },

    dateEFormatter(date) {

      return longDate(date.dateE);

    },

    editCampaingClose() {

      this.campaign = undefined;

    },

    editCampaing(campaign) {

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

  components: { CampaignDialog, CampaignPicturesDialog },

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

.placeholder{

  width: 100%;

}

</style>

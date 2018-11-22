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

    el-button(@click="campaignDialogVisible = true") Добавить акцию

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
  v-if="campaignDialogVisible"
  @closed="addCampaingClose()"
  @submit="addCampaing"
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
      campaignDialogVisible: false,
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
      campaignAvatarClick: actions.CAMPAIGN_AVATAR_CLICK,
      updateCampaign: actions.UPDATE_CAMPAIGN,
    }),

    campaignClick(row) {
      this.campaignAvatarClick(row);
    },

    dateBFormatter(date) {

      return longDate(date.dateB);

    },

    dateEFormatter(date) {

      return longDate(date.dateE);

    },

    addCampaingClose() {

      this.campaignDialogVisible = false;

    },

    addCampaing(newCampaign) {

      this.updateCampaign({
        ...newCampaign,
        isActive: true,
      });

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

img{

  width: 100%;

}

</style>

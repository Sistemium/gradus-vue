<template lang="pug">

el-container.campaigns(
  no-v-loading.fullscreen.lock="loading || busy"
  element-loading-text="Загрузка данных ..."
)

  el-header.campaigns-header(height="")

    campaign-filters.filters

    layout-select(v-model="layout")

    el-button.add-campaign(type="primary" @click="campaign = {}")
      i.el-icon-document-add
      span Добавить акцию

  el-container.campaigns-main(
    v-loading="loading"
    element-loading-text="Загрузка данных ..."
  )

    resize.resize(:padding="30" v-if="layout==='table'")
      campaigns-table(v-if="!loading" :campaigns="campaigns" @cell-click="campaignClick")
    campaigns-with-aside(:campaigns="campaigns" v-else @editCampaign="campaignClick")

  campaign-dialog(
    v-if="campaign"
    :campaign="campaign"
    @closed="editCampaignClose()"
    @submit="editCampaign"
    @remove="removeCampaign"
  )

  //router-view
  campaign-pictures-dialog(
    v-if="galleryCampaign"
    :campaign="galleryCampaign"
    @closed="onGalleryClosed"
  )

</template>

<script>

import { createNamespacedHelpers } from 'vuex';
import CampaignPicturesDialog from '@/components/campaigns/CampaignPicturesDialog.vue';
import CampaignDialog from '@/components/campaigns/CampaignDialog.vue';
import CampaignsTable from '@/components/campaigns/CampaignsTable.vue';
import CampaignFilters from '@/components/campaigns/CampaignFilters.vue';
import * as getters from '@/vuex/campaigns/getters';
import * as actions from '@/vuex/campaigns/actions';
import CampaignsWithAside from '@/components/campaigns/CampaignsWithAside.vue';
import LayoutSelect from '@/components/LayoutSelect.vue';
// import log from 'sistemium-telegram/services/log';

// const { debug } = log('Campaigns');

const { mapActions, mapGetters } = createNamespacedHelpers('campaigns');

export default {

  name: 'Campaigns',

  data() {
    return {
      loading: false,
      campaign: undefined,
      layout: 'list',
    };
  },

  computed: {

    ...mapGetters({
      campaigns: getters.CAMPAIGNS,
      galleryCampaign: getters.GALLERY_CAMPAIGN,
      busy: getters.BUSY,
    }),

  },

  methods: {

    ...mapActions({
      campaignAvatarClickStore: actions.CAMPAIGN_AVATAR_CLICK,
      updateCampaign: actions.UPDATE_CAMPAIGN,
      removeCampaign: actions.REMOVE_CAMPAIGN,
    }),

    campaignAvatarClick(campaign) {
      this.campaignAvatarClickStore(campaign)
        .then(() => {
          // this.$router.push({ name: 'campaignGallery' });
        });
    },

    editCampaignClose() {
      this.campaign = undefined;
    },

    editCampaign(campaign) {

      this.updateCampaign({
        ...campaign,
        isActive: true,
      })
        .then(({ id: campaignId }) => {
          if (campaignId === this.$route.params.campaignId) {
            return;
          }
          const location = { ...this.$route };
          location.params.campaignId = campaignId;
          this.$router.push(location);
        });

    },

    campaignClick(row, column = {}) {

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
    LayoutSelect,
    CampaignsWithAside,
    CampaignFilters,
    CampaignDialog,
    CampaignPicturesDialog,
    CampaignsTable,
  },

};

</script>

<style scoped lang="scss">

@import "../styles/variables";
@import "../styles/responsive";

.campaigns-header {

  margin-top: -5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 0;
  padding-left: 3px;
  justify-content: space-between;

}

.resize {
  display: block;
  width: 100%;
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

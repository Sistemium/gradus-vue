<template lang="pug">

el-container.campaigns(
  no-v-loading.fullscreen.lock="loading || busy"
  element-loading-text="Загрузка данных ..."
)

  el-header.header(height="")

    campaign-filters.filters

    layout-select(v-model="layout" name="campaigns")

    transition(name="bounce")
      el-tooltip(v-if="campaignCopy")
        div(slot="content") Нажмите, чтобы вставить копию акции «{{ campaignCopy.name }}»
        el-button(
          @click="onPasteCampaign"
          icon="el-icon-suitcase"
          size="mini" circle
          :disabled="isMonthClosed"
        )

    el-button.add-campaign(
      @click="addCampaignClick"
      :round="true"
      size="small"
      v-if="hasAuthoring"
      :disabled="isMonthClosed"
    )
      i.el-icon-document-add
      span Добавить акцию

    el-button.refresh(
      :disabled="!!busy"
      @click="refreshClick"
      size="small"
      :circle="true"
      :icon="busy ? 'el-icon-loading' : 'el-icon-refresh'"
    )

  el-container.campaigns-main(
    v-loading="loading"
    element-loading-text="Загрузка данных ..."
  )

    resize.resize#campaigns-scroll-container(:padding="20" v-if="layout==='table'")
      campaigns-header(:month="selectedMonth")
      template(v-if="!loading")
        campaigns-priorities(
          v-if="showPriorities"
          :priorities="priorities"
          :campaigns="filteredCampaigns"
        )
        campaigns-table(
          v-else
          :campaigns="filteredCampaigns"
          :processing="filterProcessing"
          @editCampaign="campaignClick"
        )

    campaigns-with-aside(
      v-if="layout==='list'"
      :campaign-id="campaignId"
      :campaigns="filteredCampaigns"
      @editCampaign="campaignClick"
    )

    resize.resize#campaigns-scroll-container(
      :padding="20"
      v-if="layout==='pictures'"
    )
      campaigns-flyers(
        :campaigns="filteredCampaigns"
      )

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
import CampaignPicturesDialog from '@/components/campaigns/CampaignPicturesDialog.vue';
import CampaignDialog from '@/components/campaigns/CampaignDialog.vue';
import CampaignsTable from '@/components/campaigns/CampaignsActionsTable.vue';
import CampaignFilters from '@/components/campaigns/CampaignFilters.vue';
import * as getters from '@/vuex/campaigns/getters';
import * as actions from '@/vuex/campaigns/actions';
import CampaignsWithAside from '@/components/campaigns/CampaignsWithAside.vue';
import LayoutSelect from '@/components/LayoutSelect.vue';
import { dateBE } from '@/lib/dates';
import campaignsAuth from '@/components/campaigns/campaignsAuth';
import CampaignsPriorities from '@/components/campaigns/CampaignsPriorities.vue';
import CampaignsHeader from '@/components/campaigns/CampaignsHeader.vue';
import { prioritiesOfCampaigns, searchToProcessing } from '@/services/campaigns';
import CampaignsFlyers from '@/components/campaigns/CampaignsFlyers.vue';

const NAME = 'Campaigns';

const { mapActions, mapGetters } = createNamespacedHelpers('campaigns');

export default {

  name: NAME,

  props: {
    campaignId: String,
  },

  data() {
    return {
      loading: false,
      campaign: undefined,
      message: undefined,
    };
  },

  computed: {

    layout: {
      get() {
        return this.$route.query.layout;
      },
      set(layout) {
        this.updateRouteParams({}, { layout });
      },
    },

    filterProcessing() {
      const res = searchToProcessing(this.searchText);
      return res.length ? res : ['published'];
    },

    ...mapGetters({
      error: getters.ERROR,
      campaigns: getters.CAMPAIGNS,
      galleryCampaign: getters.GALLERY_CAMPAIGN,
      busy: getters.BUSY,
      selectedMonth: getters.SELECTED_MONTH,
      campaignCopy: getters.CAMPAIGN_COPY,
      filteredCampaigns: getters.FILTERED_CAMPAIGNS,
      searchText: getters.SEARCH_TEXT,
      isMonthClosed: getters.IS_MONTH_CLOSED,
    }),

    showPriorities() {
      return this.$route.query.mode === 'priorities';
    },

    priorities() {
      return prioritiesOfCampaigns(this.filteredCampaigns);
    },

  },

  methods: {

    ...mapActions({
      campaignAvatarClickStore: actions.CAMPAIGN_AVATAR_CLICK,
      updateCampaign: actions.UPDATE_CAMPAIGN,
      removeCampaign: actions.REMOVE_CAMPAIGN,
      refreshClick: actions.REFRESH_CAMPAIGNS,
      clearError: actions.CLEAR_ERROR,
    }),

    campaignAvatarClick(campaign) {
      this.campaignAvatarClickStore(campaign)
        .then(() => {
          // this.$router.push({ name: 'campaignGallery' });
        });
    },

    addCampaignClick() {
      this.campaign = {
        processing: 'draft',
        groupCode: this.$route.query.campaignGroup || null,
        ...dateBE(this.selectedMonth),
        oneTime: true,
        repeatable: true,
      };
    },

    editCampaignClose() {
      this.campaign = undefined;
    },

    async editCampaign(campaign) {

      const saved = await this.updateCampaign({
        ...campaign,
        isActive: true,
      });

      const { id: campaignId } = saved;

      return this.updateRouteParams({ campaignId });

    },

    campaignClick(campaign) {

      const { priorityId = null } = campaign;

      this.campaign = {
        ...campaign,
        priorityId,
        actions: undefined,
        pictures: undefined,
      };

    },

    onPasteCampaign() {
      this.campaign = {
        ...this.campaignCopy,
        groupCode: this.$route.query.campaignGroup || null,
        ...dateBE(this.selectedMonth),
      };
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
          type: 'info',
          duration: 0,
        });
      }
    },
    error(message) {
      if (!message) {
        return;
      }
      this.$message({
        message: `Ошибка загрузки данных: ${message}`,
        type: 'error',
        showClose: true,
        duration: 10000,
        onClose: () => this.clearError(),
      });
    },
  },

  mixins: [campaignsAuth],

  components: {
    CampaignsFlyers,
    CampaignsHeader,
    CampaignsPriorities,
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

.header {

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

  @include responsive-only(lt-md) {
    span {
      display: none;
    }
    padding: $padding + 2;
  }

  @include responsive-only(gt-sm) {
    i {
      display: none;
    }
  }

  i {
    font-size: 15px;
  }

}

.refresh {
  padding: $padding;
  margin-left: 0;

  ::v-deep i {
    font-size: 20px;
  }
}

@media print {
  .el-header {
    display: none;
  }
  #campaigns-scroll-container {
    max-height: none !important;
  }
  .campaigns-priorities {
    page-break-after: always;
  }
}

</style>

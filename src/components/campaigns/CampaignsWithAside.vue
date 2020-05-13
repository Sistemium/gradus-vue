<template lang="pug">

el-container.campaigns-with-aside
  el-aside
    resize#campaigns-list-container(:padding="30")
      campaigns-list(:campaigns="campaigns" v-model="currentCampaign")
  el-main
    campaign-view(
      v-if="currentCampaign"
      :campaign="currentCampaign"
      :pictures="currentCampaignPictures"
      @editCampaign="onEditCampaign"
      @campaignPictureClick="campaignPictureClick"
    )
    campaigns-picture-gallery(
      v-if="currentCampaign && !currentCampaignPictures.length"
      :new-image-properties="{ campaignId: currentCampaign.id }"
      carousel-type=""
      :show-empty="false"
      @uploaded="setPictures(currentCampaign)"
    )
    el-alert(
      v-if="!currentCampaign && campaigns.length"
      title="👈 Выберите акцию из списка"
      type="info"
    )

</template>
<script>

import find from 'lodash/find';
import * as svc from '@/services/campaigns';
import * as actions from '@/vuex/campaigns/actions';
import { createNamespacedHelpers } from 'vuex';
import CampaignsPictureGallery from './CampaignsPictureGallery';
import CampaignsList from './CampaignsList.vue';
import CampaignView from './CampaignView.vue';

const { mapActions } = createNamespacedHelpers('campaigns');

const NAME = 'CampaignsWithAside';

export default {

  data() {
    return {
      loading: false,
      currentCampaign: undefined,
      currentCampaignPictures: [],
    };
  },

  props: {
    campaigns: Array,
  },

  watch: {
    currentCampaign(campaign) {
      const { id: campaignId } = campaign || {};
      this.updateRouteParams({ campaignId });
      this.setPictures(campaign);
      this.$nextTick(() => {
        this.scrollToCampaign(campaign);
      });
    },
  },

  computed: {
    routedCampaign() {
      const { campaignId } = this.$route.params;
      return find(this.campaigns, { id: campaignId }) || null;
    },
  },

  created() {
    this.$watch('routedCampaign', campaign => {
      if (campaign || this.campaigns.length) {
        this.currentCampaign = campaign;
      }
    }, { immediate: true });
  },

  mounted() {
    this.$nextTick(() => {
      this.scrollToCampaign(this.currentCampaign);
    });
  },

  methods: {
    ...mapActions({
      campaignPictureClick: actions.SHOW_CAMPAIGN_PICTURE,
    }),
    onEditCampaign(campaign) {
      this.$emit('editCampaign', campaign);
    },
    scrollToCampaign(campaign) {
      if (!campaign) {
        return;
      }
      this.$scrollTo(`#c-${campaign.id}`, 500, {
        container: '#campaigns-list-container',
        force: false,
      });
    },
    setPictures(campaign) {
      this.currentCampaignPictures = campaign ? campaign.pictures : [];
      if (!campaign) {
        return;
      }
      this.loading = true;
      svc.getCampaignPicturesByCampaign(campaign)
        .then(pictures => {
          this.currentCampaignPictures = pictures;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },

  name: NAME,
  components: {
    CampaignsPictureGallery,
    CampaignView,
    CampaignsList,
  },
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

aside {
  margin-top: $margin-top;
}

</style>

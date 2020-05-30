<template lang="pug">

el-container.campaigns-with-aside

  el-aside
    resize#campaigns-scroll-container(:padding="30")
      campaigns-list(:campaigns="campaigns" v-model="currentCampaign")

  el-main

    campaign-view(
      v-if="currentCampaign"
      :campaign="currentCampaign"
      :pictures="currentCampaignPictures"
      @campaignPictureClick="campaignPictureClick"
    )
      template(v-slot:buttons)
        button-edit(@click="onEditCampaign")
        button-add(@click="onAddAction")
      template(v-slot:footer)
        campaigns-picture-gallery(
          v-if="currentCampaign"
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

    router-view(v-if="currentCampaign")

</template>
<script>

import find from 'lodash/find';

import CampaignPicture from '@/models/CampaignPicture';
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
      // this.scrollToCampaign(this.currentCampaign);
    });
  },

  methods: {
    ...mapActions({
      campaignPictureClick: actions.SHOW_CAMPAIGN_PICTURE,
    }),
    onEditCampaign() {
      this.$emit('editCampaign', this.currentCampaign);
    },
    onAddAction() {
      const { params } = this.$route;
      this.$router.push({
        name: 'campaignActionCreate',
        params: { ...params },
      });
    },
    scrollToCampaign(campaign) {
      if (!campaign) {
        return;
      }
      this.$scrollTo(`#c-${campaign.id}`, 500, {
        container: '#campaigns-scroll-container',
        force: false,
      });
    },
    setPictures(campaign) {
      // this.currentCampaignPictures = campaign ? campaign.pictures : [];
      const query = { campaignId: campaign && campaign.id };
      CampaignPicture.bindAll(this, query, 'currentCampaignPictures');
      if (!campaign) {
        return;
      }
      this.loading = true;
      svc.getCampaignPicturesByCampaign(campaign, true)
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

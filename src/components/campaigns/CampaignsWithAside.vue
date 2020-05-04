<template lang="pug">

el-container.campaigns-with-aside
  el-aside
    resize(:padding="30")
      campaigns-list.campaigns-list(:campaigns="campaigns" v-model="currentCampaign")
  el-main()
    campaign-view(
      v-if="currentCampaign"
      :campaign="currentCampaign"
      :pictures="currentCampaignPictures"
    )

</template>
<script>

import find from 'lodash/find';
import CampaignsList from '@/components/campaigns/CampaignsList.vue';
import CampaignView from '@/components/campaigns/CampaignView.vue';
import * as svc from '@/services/campaigns';

const NAME = 'CampaignsWithAside';

export default {

  data() {
    return {
      currentCampaign: undefined,
      currentCampaignPictures: undefined,
    };
  },

  props: {
    campaigns: Array,
  },

  watch: {
    currentCampaign(campaign) {
      this.setRouterParams(campaign);
      this.currentCampaignPictures = [];
      svc.getCampaignPicturesByCampaign(campaign)
        .then(pictures => {
          this.currentCampaignPictures = pictures;
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

  methods: {
    setRouterParams(campaign) {
      const { id: campaignId } = campaign || {};
      const { name, params = {} } = this.$route;
      if (params.campaignId === campaignId) {
        return;
      }
      this.$router.push({
        name,
        params: {
          ...params,
          campaignId,
        },
      });
    },
  },

  name: NAME,
  components: {
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

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
      this.currentCampaignPictures = [];
      svc.getCampaignPicturesByCampaign(campaign)
        .then(pictures => {
          this.currentCampaignPictures = pictures;
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

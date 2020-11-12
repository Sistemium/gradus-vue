<template lang="pug">

el-container.campaigns-with-aside

  el-aside
    resize#campaigns-scroll-container(:padding="20")
      priorities-list(
        v-if="!searchText"
        :campaigns="campaigns"
        v-model="currentPriorityId"
      )
      campaigns-list(:campaigns="campaigns" v-model="currentCampaignId")

  el-main

    el-alert(
      v-if="!currentCampaignId && !currentPriorityId && campaigns.length"
      title="👈 Выберите акцию из списка"
      type="info"
    )

    router-view(@editCampaign="onEditCampaign")

</template>
<script>

import { createNamespacedHelpers } from 'vuex';
import * as g from '@/vuex/campaigns/getters';
import PriorityActions from '@/components/actions/PriorityActions.vue';
import PrioritiesList from '@/components/actions/PrioritiesList.vue';
import CampaignsList from './CampaignsList.vue';

const { mapGetters } = createNamespacedHelpers('campaigns');

const NAME = 'CampaignsWithAside';

export default {

  name: NAME,

  data() {
    return {
      loading: false,
      currentCampaignPictures: [],
    };
  },

  props: {
    campaigns: Array,
    campaignId: String,
  },

  computed: {
    ...mapGetters({
      searchText: g.SEARCH_TEXT,
    }),
    currentPriorityId: {
      get() {
        return this.$route.params.priorityId;
      },
      set(priorityId) {

        if (priorityId) {
          this.currentCampaignId = undefined;
        } else if (this.currentCampaignId || !priorityId) {
          return;
        }

        this.updateRouteParams({
          campaignId: undefined,
          priorityId,
        }, {}, 'campaignsPriorities');

      },
    },
    currentCampaignId: {
      get() {
        return this.campaignId;
      },
      set(campaignId) {
        if (campaignId) {
          this.currentPriorityId = undefined;
        } else if (this.currentPriorityId) {
          return;
        }

        const updateName = campaignId ? 'campaign' : 'campaigns';
        this.updateRouteParams({
          campaignId,
          priorityId: undefined,
        }, {}, updateName);

      },
    },
  },

  created() {
    this.$watchImmediate(() => ({
      campaigns: this.campaigns,
      campaignId: this.campaignId,
    }), ({ campaigns, campaignId }) => {
      if (campaigns.length && campaignId) {
        this.$nextTick(() => {
          this.scrollToCampaign(this.campaignId);
        });
      }
    });
  },

  methods: {

    scrollToCampaign(campaignId) {
      if (!campaignId) {
        return;
      }
      this.$scrollTo(`#c-${campaignId}`, 500, {
        container: '#campaigns-scroll-container',
        force: false,
      });
    },

    onEditCampaign(campaign) {
      this.$emit('editCampaign', campaign);
    },

  },

  components: {
    PriorityActions,
    PrioritiesList,
    CampaignsList,
  },


};

</script>
<style scoped lang="scss">

@import "../../styles/variables";
@import "../../styles/responsive";

aside {
  margin-top: $margin-top;
  @include responsive-only(lt-md) {
    max-width: 220px;
  }
  @include responsive-only(md) {
    max-width: 260px;
  }
}

main {
  padding-right: 0;
  padding-bottom: 0;
}

.priorities-list {
  margin-bottom: $margin-top;
}

@media print {
  .el-aside {
    display: none;
  }
  main {
    padding: 0 !important;
  }
}

</style>

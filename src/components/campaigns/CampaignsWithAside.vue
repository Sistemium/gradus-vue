<template lang="pug">

el-container.campaigns-with-aside

  el-aside
    resize#campaigns-scroll-container(:padding="20")
      priorities-list(
        v-if="!searchText"
        :campaigns="campaigns"
        v-model="currentPriority"
      )
      campaigns-list(:campaigns="campaigns" v-model="currentCampaignId")

  el-main

    el-alert(
      v-if="!currentCampaignId && !currentPriority && campaigns.length"
      title="👈 Выберите акцию из списка"
      type="info"
    )

    resize(:padding="20" v-if="currentPriority")
      priority-actions(
        :campaigns="campaigns"
        :priority="currentPriority"
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
      currentPriority: undefined,
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
    currentCampaignId: {
      get() {
        return this.campaignId;
      },
      set(campaignId) {
        if (campaignId) {
          this.currentPriority = undefined;
        } else if (this.currentPriority) {
          return;
        }

        const updateName = campaignId ? 'campaign' : 'campaigns';
        this.updateRouteParams({ campaignId }, {}, updateName);

        this.$nextTick(() => {
          this.scrollToCampaign(campaignId);
        });
      },
    },
  },

  watch: {
    currentPriority(priority) {
      const { id: priorityId } = priority || {};
      if (priorityId) {
        this.currentCampaignId = undefined;
      } else if (this.currentCampaignId) {
        return;
      }
      this.updateRouteParams({ priorityId }, {}, 'campaignsPriorities');
    },
  },

  created() {
    this.$watchImmediate('$route.params.campaignId', campaignId => {
      this.currentCampaignId = campaignId;
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

</style>

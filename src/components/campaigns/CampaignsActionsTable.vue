<template lang="pug">

.campaigns-actions-table
  .campaign(
    v-for="campaign in campaignsWithActions" :key="campaign.id"
    :id="`c-${campaign.id}`"
  )
    .name() {{ campaign.name }}
    .actions
      campaign-action(v-for="action in campaign.actions" :action="action" :key="action.id")

</template>
<script>

import filter from 'lodash/filter';
import CampaignAction from '@/components/campaigns/CampaignAction.vue';

const NAME = 'CampaignsActionsTable';

export default {
  computed: {
    campaignsWithActions() {
      return filter(this.campaigns, ({ actions }) => actions.length);
    },
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
  },
  created() {
    this.$watch('$route.params.campaignId', campaignId => {
      this.$nextTick(() => {
        this.scrollToCampaign(campaignId);
      });
    }, { immediate: true });
  },
  props: {
    campaigns: Array,
  },
  components: { CampaignAction },
  name: NAME,
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.name {
  padding: $margin-top 0;
  margin-bottom: -$margin-top;
  font-size: large;
  position: sticky;
  top: 0;
  background: white;
}

</style>

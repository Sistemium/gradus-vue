<template lang="pug">

.campaigns-actions-table
  table.campaign(
    v-for="campaign in campaignsWithActions" :key="campaign.id"
    :id="`c-${campaign.id}`"
  )
    thead
      tr
        td.name()
          i.el-icon-s-management
          span {{ campaign.name }}
    tbody.actions
      tr(v-for="action in campaign.actions" :key="action.id")
        td
          campaign-action(:action="action" )
  router-view

</template>
<script>

import filter from 'lodash/filter';
import Action from '@/models/Action';
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
    this.$bindToModel(Action);
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
  font-size: x-large;
  font-weight: 500;
  position: sticky;
  top: 0;
  background: white;
  color: $gray;

  i {
    margin-right: $margin-top;
  }

}

table {
  border-spacing: 0;
  width: 100%;
}

tr + tr td {
  padding-top: $margin-top;
}

</style>

<template lang="pug">

.priority-actions
  .title
    i.el-icon-s-flag
    span {{ priority.name }}
  campaigns-actions-table(:campaigns="priorityCampaigns" :priority-id="priority.id")

</template>
<script>

import { campaignsWithPriorityActions } from '@/services/campaigns';
import CampaignsActionsTable from '@/components/campaigns/CampaignsActionsTable.vue';

const NAME = 'PriorityActions';

export default {
  name: NAME,
  components: { CampaignsActionsTable },
  props: {
    priority: {
      type: Object,
      required: true,
    },
    campaigns: {
      type: Array,
      required: true,
    },
  },
  computed: {
    priorityCampaigns() {
      return campaignsWithPriorityActions(this.campaigns, this.priority.id);
    },
  },
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.title {
  font-size: x-large;
  padding: $margin-top 0;
  i {
    color: $orange;
    margin-right: $margin-right;
  }
  @media print {
    span {
      font-weight: bold;
    }
  }
}

.campaigns-actions-table /deep/ {
  .action-history-view {
    display: none;
  }
}

</style>

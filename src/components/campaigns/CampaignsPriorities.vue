<template lang="pug">

.campaigns-priorities(v-if="priorities.length")
  priority-actions(
    v-for="priority in priorities" :key="priority.id"
    :priority="priority"
    :campaigns="campaigns"
  )

</template>
<script>

import { prioritiesOfCampaigns } from '@/services/campaigns';
import PriorityActions from '@/components/actions/PriorityActions.vue';

const NAME = 'CampaignsPriorities';

export default {
  name: NAME,
  components: { PriorityActions },
  props: {
    campaigns: Array,
  },
  computed: {
    priorities() {
      return prioritiesOfCampaigns(this.campaigns);
    },
  },
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.priority-actions {
  margin: $margin-top 0;
}

</style>

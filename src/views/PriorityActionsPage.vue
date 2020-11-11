<template lang="pug">

resize(:padding="20")
  priority-actions(
    v-for="priority in priorities" :key="priority.id"
    :campaigns="campaigns"
    :priority="priority"
  )

</template>
<script>

import { createNamespacedHelpers } from 'vuex';
import PriorityActions from '@/components/actions/PriorityActions.vue';
import { FILTERED_CAMPAIGNS } from '@/vuex/campaigns/getters';
import CampaignsPriority from '@/models/CampaignsPriority';
import { prioritiesOfCampaigns } from '@/services/campaigns';

const { mapGetters } = createNamespacedHelpers('campaigns');

const NAME = 'PriorityActionsPage';

export default {
  name: NAME,
  components: { PriorityActions },
  props: {
    priorityId: String,
  },
  computed: {
    ...mapGetters({ campaigns: FILTERED_CAMPAIGNS }),
    priority() {
      return CampaignsPriority.reactiveGet(this.priorityId);
    },
    priorities() {
      if (this.priority) {
        return [this.priority];
      }
      return CampaignsPriority.ts ? prioritiesOfCampaigns(this.campaigns) : [];
    },
  },
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

</style>

<template lang="pug">

resize(:padding="20" v-if="priority")
  priority-actions(
    :campaigns="campaigns"
    :priority="priority"
  )

</template>
<script>

import { createNamespacedHelpers } from 'vuex';
import PriorityActions from '@/components/actions/PriorityActions.vue';
import { FILTERED_CAMPAIGNS } from '@/vuex/campaigns/getters';
import CampaignsPriority from '@/models/CampaignsPriority';

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
  },
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

</style>

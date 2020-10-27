<template lang="pug">

.campaigns-priorities(v-if="priorities.length")
  priority-actions(
    v-for="priority in priorities" :key="priority.id"
    :priority="priority"
    :campaigns="campaigns"
  )

</template>
<script>

import PriorityActions from '@/components/actions/PriorityActions.vue';

const NAME = 'CampaignsPriorities';

export default {
  name: NAME,
  components: { PriorityActions },
  props: {
    priorities: Array,
    campaigns: Array,
  },
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.priority-actions {
  margin: $margin-top 0;
}

</style>

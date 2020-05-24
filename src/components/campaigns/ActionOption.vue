<template lang="pug">

.action-option

  .name(v-if="action.name") {{ action.name }}
    .comment(v-if="action.commentText") {{ action.commentText }}

  //.conditions
  .options(v-if="hasOptions")
    .option(v-for="option in hasOptions")
      action-option(:action="option")

  action-required(:action="action" ref="required")
  action-discount(:action="action" ref="discount")

</template>
<script>

import actionBase from '@/components/campaigns/actionBase';
import ActionRequired from '@/components/campaigns/ActionRequired.vue';
import ActionDiscount from '@/components/campaigns/ActionDiscount.vue';

const NAME = 'ActionOption';

export default {

  name: NAME,
  components: {
    ActionDiscount,
    ActionRequired,
  },
  mixins: [actionBase],

};

</script>
<style scoped lang="scss">

@import "../../styles/variables";
@import "./actionBase";

.condition, .action-option {
  display: flex;
}

.comment {
  color: $dark-gray;
  font-size: smaller;
}

.name {
  flex: 1;
  padding: $padding;
}

</style>

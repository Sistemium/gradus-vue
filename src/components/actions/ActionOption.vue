<template lang="pug">

td.action-option

  .name(v-if="action.name") {{ action.name }}
    .comment(v-if="action.commentText") {{ action.commentText }}

  .ranges(v-if="action.ranges")
    .name(v-for="range in action.ranges") {{ range.name }}

  //.conditions
  //.options(v-if="hasOptions")
    .option(v-for="option in hasOptions")
      action-option(:action="option")

  // action-required(:action="action" ref="required")
  // action-discount(:action="action" ref="discount")

</template>
<script>

import actionBase from './actionBase';
import ActionRequired from './ActionRequired.vue';
import ActionDiscount from './ActionDiscount.vue';

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
//  display: flex;
}

.comment {
  color: $dark-gray;
  font-size: smaller;
  white-space: pre-line;
}

.name + .name {
  //flex: 1;
  //padding: $padding;
  margin-top: $padding;
}

</style>

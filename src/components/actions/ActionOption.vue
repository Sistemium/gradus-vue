<template lang="pug">

td.action-option

  .name(v-if="action.name") {{ action.name }}

  .ranges(v-if="action.ranges")
    .name(v-for="range in action.ranges") {{ range.name }}

  .comment(v-if="action.commentText") {{ action.commentText }}

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

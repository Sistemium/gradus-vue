<template lang="pug">

.action-option(:class="(hasOptions || showConditions) && 'grid'")

  .self
    .name(v-if="action.name") {{ action.name }}

    .ranges(v-if="action.ranges")
      .name(v-for="range in action.ranges") {{ range.name }}

    .comment(v-if="action.commentText")
      i.el-icon-info
      span {{ action.commentText }}

  template(v-if="hasOptions || showConditions")
    action-required(
      :action="action"
    )

    template(v-if="discount")
      .discount(
        v-for="discountHeader in discountHeaders"
      ) {{ action[discountHeader.name] || '-' }}
    template(v-if="!discount")
      .discount(
        v-for="discountHeader in discountHeaders"
      ) {{ option[discountHeader.name] || '-' }}

  action-option(v-for="option in action.options" :action="option" :show-conditions="true")

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
  computed: {
    discountHeaders() {
      return [
        {
          title: '% комп.',
          name: 'discountComp',
        },
        {
          title: '% комм.',
          name: 'discountOwn',
        },
      ];
    },
  },
  mixins: [actionBase],
  props: {
    showConditions: {
      type: Boolean,
      default: false,
    },
  },
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";
@import "./actionBase";

.action-option.grid {

  display: grid;
  grid-gap: 1px;
  grid-template-columns: auto 90px 90px 90px;
  background: $gray-border-color;

  > .action-option {
    grid-column: 1 / span 4;
  }

}

.discount, .action-required {
  text-align: center;
  background: white;
  padding: $padding;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.self {
  background: white;
  padding: $padding;

  > * + * {
    margin-top: $padding;
  }
}

</style>

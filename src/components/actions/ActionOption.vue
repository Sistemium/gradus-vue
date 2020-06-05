<template lang="pug">

.action-option(:class="hasOptions && 'grid'")

  .self(v-if="action.name || action.ranges && action.ranges.length || action.commentText")
    .name(v-if="action.name") {{ action.name }}

    .ranges(v-if="action.ranges")
      .range(v-for="range in action.ranges") {{ range.name }}

    .comment(v-if="action.commentText")
      i.el-icon-info
      span {{ action.commentText }}

  template(v-if="showConditions")
    .action-required(
      v-for="req in ownRequirements"
      :class="req.cls"
      :style="hasOptions && { 'grid-row-end': `span ${action.options.length}` }"
    ) {{ req.value }}

    .discount.comp(
      v-if="!hasOptions"
      v-for="discountHeader in discountHeaders"
    ) {{ action[discountHeader.name] || '-' }}

  template(v-for="(option, idx) in action.options" :action="option")
    .option
      .name() {{ option.name }}
      template(v-if="option.ranges")
        .range(v-for="range in option.ranges") {{ range.name }}
    .option-required(
      v-for="req in optionRequirements(option)" :class="req.cls" :key="`${req.cls}${idx}`"
    ) {{ req.value }}
    .discount(
      v-for="discountHeader in discountHeaders"
      :class="discountHeader.cls"
    ) {{ option[discountHeader.name] || '-' }}
  //template(v-for="(option, idx) in action.options" :action="option")

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
          cls: 'comp',
        },
        {
          title: '% комм.',
          name: 'discountOwn',
          cls: 'own',
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
  grid-template-columns: auto 89px 59px 89px 89px;
  grid-template-rows: auto auto;
  background: $gray-border-color;

  > .action-option {
    grid-column: 1 / span 5;
  }

}

.option {
  grid-column: 1;
}

.sku {
  grid-column: 3;
}

.action-option > .action-required {
  grid-row-start: 1;
}

.comp {
  grid-column: 4;
}

.own {
  grid-column: 5;
}

.discount, .action-required, .option, .option-required {
  text-align: center;
  background: white;
  padding: $padding;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.option {
  align-items: flex-start;

  > * + * {
    margin-top: $padding;
  }
}

.self {

  grid-column: 1;

  background: white;
  padding: $padding;

  > * + * {
    margin-top: $padding;
  }
}

.name {
  font-weight: bold;
}

</style>

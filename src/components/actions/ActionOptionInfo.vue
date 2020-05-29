<template lang="pug">

.action-option-info
  action-option.title(
    :action="action"
    v-if="action.name || action.commentText || action.ranges.length"
  )
  .required(v-if="hasRequired")
    label Условия
    action-required(:action="action")
  .discount(v-if="discount")
    label Скидка
    span.total(v-if="discount.own && discount.comp") {{ discount.own + discount.comp }} %
    span.comp(v-if="discount.comp") {{ discount.comp || 0 }}% комп.
    span.own(v-if="discount.own") {{ discount.own || 0 }}% комм.

</template>
<script>

import ActionOption from '@/components/actions/ActionOption.vue';
import ActionRequired from '@/components/actions/ActionRequired.vue';
import actionBase from '@/components/actions/actionBase';

const NAME = 'ActionOptionInfo';

export default {
  name: NAME,
  components: {
    ActionOption,
    ActionRequired,
  },
  mixins: [actionBase],
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.action-option-info {

  display: flex;
  flex-wrap: wrap;
  // grid-template-columns: auto auto;

}

.title {
  // grid-column: 1 / span 2;
  display: block;
  min-width: 100%;
}

.discount, .required {
  margin: $padding $margin-right 0 0;
  display: flex;
  padding: $padding;
  background: white;
  border-radius: $border-radius;
}

.action-required {
  display: flex;

  > /deep/ * + * {
    margin-left: $margin-right;

    &:before {
      content: "+";
      margin-right: $margin-right;
    }
  }
}

.comp + .own:before {
  content: "+";
  margin: 0 $margin-right;
}

.discount .total:after {
  content: "=";
  margin: 0 $margin-right;
}

label {
  margin-right: $margin-right;
  color: $gray;

  &:after {
    content: ":";
  }
}

</style>

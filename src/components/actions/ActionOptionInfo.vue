<template lang="pug">

.action-option-info
  //action-option.title(
  //  :action="action"
  //  v-if="action.name || action.commentText || action.ranges.length || action.options"
  //)

  .name(v-if="action.name") {{ action.name }}

  .ranges(v-if="action.ranges")
    .range(v-for="range in action.ranges") {{ range.name }}

  .options
    action-option-info(v-for="option in action.options" :action="option")

  .other(v-if="hasRequired || discount")
    .required(v-if="hasRequired")
      label Условия
      action-required(:action="action")
    .discount(v-if="discount")
      label Скидка
      span.total(v-if="discount.own && discount.comp")
        | {{ discount.own + discount.comp | number(3) }} %
      span.comp(v-if="discount.comp") {{ discount.comp || 0 }}% комп.
      span.own(v-if="discount.own") {{ discount.own || 0 }}% комм.
    .cash(v-if="action.discountCash")
      label Бонус
      strong {{ action.discountCash }}
      span ₽

  .comment(v-if="action.commentText")
    i.el-icon-info
    span {{ action.commentText }}

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
@import "./actionBase";

.action-option-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.ranges, .action-option-info {
  > * + * {
    margin-top: $padding;
  }
}

.title {
  display: block;
  min-width: 100%;
}

.other {
  display: flex;
  padding: $padding;
  background: white;
  border-radius: $border-radius;
  flex-wrap: wrap;
}

.discount, .required, .cash {
  margin-right: $margin-right;
  display: flex;
  align-items: center;
}

.action-required {
  display: flex;

  > /deep/ * + * {
    margin-left: $margin-right;
    margin-top: 0;

    &:not(.isMultiple):before {
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

.options > .action-option-info  {
  & + .action-option-info {
    margin-top: $padding;
  }
  padding: $padding;
  border: solid 2px white;
  border-radius: $border-radius;
}

</style>

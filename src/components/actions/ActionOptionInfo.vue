<template lang="pug">

.action-option-info
  action-option.title(:action="action")
  .required(v-if="hasRequired")
    label Условия
    action-required(:action="action")
  .discount(v-if="discount")
    label Скидка
    .own {{ discount.own || 0 }}% комм.
    .comp {{ discount.comp || 0 }}% комп.

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

  display: grid;
  grid-template-columns: auto auto;

}

.title {
  grid-column: 1 / span 2;
}

.discount, .required {
  margin-top: $padding;
  display: flex;
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

.comp:before {
  content: "+";
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

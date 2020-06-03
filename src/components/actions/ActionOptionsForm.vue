<template lang="pug">

.action-options-form(v-if="model.options")

  .header
    .title {{ title }}
    .buttons
      button-add(@click="$emit('addOption')")

  .option(v-for="(option, idx) in model.options" :key="idx")
    .number
      .idx {{ idx + 1 }}
    action-option-info(:action="option")
    .buttons
      button-edit(@click="$emit('editOption', option, idx)")

</template>
<script>

import ActionOptionInfo from '@/components/actions/ActionOptionInfo.vue';

const NAME = 'ActionOptionsForm';

export default {
  name: NAME,
  components: { ActionOptionInfo },
  props: {
    model: Object,
    title: {
      type: String,
      default: 'Варианты',
    },
  },
};

</script>
<style scoped lang="scss">
@import "../../styles/variables";

.option {

  display: grid;
  grid-template-columns: 35px auto 35px;
  border: $list-cell-borders;
  border-radius: $border-radius;
  padding: $padding;
  background: $gray-background;
  margin-top: $padding;

  .buttons {
    grid-column: 3;
    text-align: right;
  }

  .number {
    text-align: center;
    padding: $padding $padding $padding 0;
    font-weight: bold;
  }

}


.header {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 13px;

  .title {
    flex: 1;
    color: #303133;
  }
}

</style>

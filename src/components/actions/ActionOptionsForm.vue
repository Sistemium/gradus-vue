<template lang="pug">

.action-options-form(v-if="model.options")

  .header
    .title {{ title }}
    .buttons
      transition(name="bounce")
        el-tooltip(v-if="hasPaste")
          div(slot="content") Нажмите, чтобы вставить скопированый вариант
          el-button(
            @click="$emit('pasteOption')"
            icon="el-icon-suitcase"
            size="mini" circle
          )
      button-add(@click="$emit('addOption')")

  transition-group(name="flip-list")
    .option(v-for="(option, idx) in model.options" :key="option._id || option.id")
      .number
        a(@click="reorder(idx, -1)" v-if="idx > 0")
          i.el-icon-arrow-up
        .idx {{ idx + 1 }}
        a(@click="reorder(idx, 1)" v-if="model.options.length > idx + 1")
          i.el-icon-arrow-down
      action-option-info(:action="option")
      .buttons
        button-edit(@click="$emit('editOption', option, idx)")
        el-button(
          @click="$emit('copyOption', option)"
          icon="el-icon-copy-document"
          size="mini" circle
        )

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
    hasPaste: Boolean,
  },
  methods: {
    reorder(idx, dir) {
      const { options } = this.model;
      const option = options[idx];
      const newIdx = idx + dir;
      if (newIdx < 0 || newIdx >= options.length) {
        return;
      }
      const option2 = options[newIdx];
      this.$set(options, newIdx, option);
      this.$set(options, idx, option2);
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
    align-items: flex-end;
    display: flex;
    flex-direction: column;

    > * + * {
      margin-top: $padding;
    }
  }

  .number {
    text-align: center;
    padding: $padding $padding $padding 0;
    font-weight: bold;
    display: flex;
    flex-direction: column;
  }

}


.header {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: $small-font-size;

  .title {
    flex: 1;
    color: #303133;
  }
}

</style>

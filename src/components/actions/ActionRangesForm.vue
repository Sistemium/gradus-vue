<template lang="pug">

.action-ranges-form(v-if="model.ranges")

  .header
    h3.title Ассортимент
    .buttons
      button-add(@click="addRangeClick")

  .range(v-for="(range, idx) in model.ranges" :key="idx")
    // el-form-item(:required="true")
    el-input(
      v-model="range.name"
      size="mini"
      :clearable="true"
      @clear="clearRangeClick(idx)"
      placeholder="описание ассортимента"
      :ref="`range${idx}`"
    )
      template(slot="prepend") {{ idx+1 }}

</template>
<script>

const NAME = 'ActionRangesForm';

export default {
  name: NAME,
  props: {
    model: Object,
  },
  methods: {
    clearRangeClick(idx) {
      this.model.ranges.splice(idx, 1);
    },
    addRangeClick() {
      this.model.ranges.push({ name: '' });
      this.$nextTick(() => {
        this.$refs[`range${this.model.ranges.length - 1}`][0].$refs.input.focus();
      });
    },
  },
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.action-ranges-form {
  margin-bottom: 8px;

  .range {
    margin-top: $padding;
  }
}

.header {
  display: flex;
  align-items: center;

  .title {
    color: #303133;
    flex: 1;
    margin: 0;
  }
}

</style>

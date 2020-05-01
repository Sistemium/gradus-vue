<template lang="pug">

.layout-select
  el-radio-group(v-model="choice" @change="onChange")
    el-radio-button(label="list")
      i.el-icon-notebook-2
    el-radio-button(label="table")
      i.el-icon-c-scale-to-original

</template>
<script>

const NAME = 'LayoutSelect';

export default {
  name: NAME,
  data() {
    return {
      choice: this.value,
    };
  },
  props: {
    value: {
      type: String,
      default: 'table',
    },
  },
  methods: {
    onChange(value) {
      this.$emit('input', value);
    },
  },
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

i {
  font-size: x-large;
}

.layout-select /deep/ .el-radio-button__inner {
  padding: 8px;
}

</style>

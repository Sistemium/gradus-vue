<template lang="pug">

  .layout-select
    el-radio-group(v-model="choice")
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
    name: {
      type: String,
      default: 'default',
    },
    value: {
      type: String,
    },
  },
  computed: {
    localStorageKey() {
      return `stv.layout.${this.name}`;
    },
  },
  watch: {
    choice(value) {
      localStorage.setItem(this.localStorageKey, value);
      this.$emit('input', value);
    },
  },
  created() {
    if (!this.value) {
      this.choice = localStorage.getItem(this.localStorageKey) || 'list';
    }
  },
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

i {
  font-size: large;
}

.layout-select /deep/ .el-radio-button__inner {
  padding: 6px;
}

</style>

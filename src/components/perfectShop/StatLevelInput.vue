<template lang="pug">

el-select.stat-level-input(v-model="level" placeholder="Выберите")

  el-option(
    v-for="lvl in levels" :key="lvl"
    :label="lvl"
    :value="lvl"
  )

</template>
<script>

const NAME = 'StatLevelInput';

export default {
  name: NAME,
  props: {
    value: String,
    levels: Array,
  },
  computed: {
    level: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

</style>

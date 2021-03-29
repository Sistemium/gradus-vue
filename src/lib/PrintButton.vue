<template lang="pug">

el-button.print-button(
  @click="onClick"
  icon="el-icon-printer"
  v-bind="$attrs"
)

</template>
<script>

const NAME = 'PrintButton';

export default {
  name: NAME,
  props: {
    // type: {
    //   type: String,
    //   default: '',
    // },
  },
  methods: {
    onClick() {
      window.print();
    },
  },
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

</style>

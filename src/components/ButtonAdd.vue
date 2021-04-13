<template lang="pug">

el-button.button-add(
  @click="$emit('click')"
  size="mini"
  icon="el-icon-circle-plus"
  circle
  :disabled="disabled"
)

</template>
<script>

const NAME = 'ButtonAdd';

export default {
  name: NAME,
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.button-add:not(.is-disabled) {
  color: $primary-color;
}

</style>

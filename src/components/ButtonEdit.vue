<template lang="pug">

el-button.button-edit(
  @click="$emit('click')"
  size="mini"
  icon="el-icon-edit"
  circle
  :disabled="disabled"
)

</template>
<script>

const NAME = 'ButtonEdit';

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
<style lang="scss">
@import "../styles/variables";

.button-edit {
  color: $primary-color;
}
</style>

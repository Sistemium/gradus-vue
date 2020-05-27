<template lang="pug">

el-button.button-edit(@click="$emit('click')" size="mini" icon="el-icon-edit" circle)

</template>
<script>

const NAME = 'ButtonEdit';

export default {
  name: NAME,
};

</script>
<style lang="scss">
@import "../styles/variables";

.button-edit {
  color: $primary-color;
}
</style>

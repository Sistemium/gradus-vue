<template lang="pug">

el-button.button-add(@click="$emit('click')" size="mini" icon="el-icon-circle-plus" circle)

</template>
<script>

const NAME = 'ButtonAdd';

export default {
  name: NAME,
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.button-add {
  color: $primary-color;
}

</style>

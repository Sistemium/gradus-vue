<template lang="pug">

.outlet-info(v-if="outlet")
  .name {{ outlet.name }}
  .address {{ outlet.address }}

</template>
<script>

const NAME = 'OutletInfo';

export default {
  name: NAME,
  props: {
    outlet: Object,
  },
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.address {
  font-size: small;
  margin-top: $padding;
}

</style>

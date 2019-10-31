<template lang="pug">

.salesman-outlets-list.list-group
  .salesman.list-group-item(
    v-for="outlet in outlets"
    :key="outlet.id"
  )
    .name(v-text="outlet.name")
    .address(v-text="outlet.address")

</template>
<script>

const NAME = 'SalesmanOutletsList';

export default {
  props: {
    outlets: Array,
  },
  name: NAME,
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.address {
  margin-top: $padding;
  color: $gray;
}

</style>

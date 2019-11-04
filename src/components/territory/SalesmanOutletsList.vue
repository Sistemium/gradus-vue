<template lang="pug">

.salesman-outlets-list.list-group
  .salesman.list-group-item(
    v-for="outlet in outlets"
    :key="outlet.id"
  )
    .texts
      .name(v-text="outlet.name")
      .address(v-text="outlet.address")
    .status(v-if="outlet.statusIcon()")
      i(:class="outlet.statusIcon()")

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

.salesman {
  display: flex;
  .texts {
    flex: 1;
  }
}

i {
  color: $blue;
}

.el-icon-circle-check {
  color: $green;
}

</style>

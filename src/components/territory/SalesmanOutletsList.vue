<template lang="pug">

.salesman-outlets-list.list-group
  .salesman.list-group-item(
    v-for="outlet in outlets"
    :key="outlet.id"
    @click="$emit('click', outlet)"
  )
    .texts
      .name(v-text="outlet.name")
      .address(v-text="outlet.address")
      .comment(v-if="outlet.commentText")
        i.el-icon-info
        span.comment-text(v-text="outlet.commentText")
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

.texts > * + * {
  margin-top: $padding;
}

.address {
  color: $gray;
}

.salesman {
  display: flex;

  .texts {
    flex: 1;
  }
}

i {
  color: $orange;
}

.el-icon-circle-check {
  color: $green;
}

.comment-text {
  margin-left: $padding;
}

</style>

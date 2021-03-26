<template lang="pug">

.perfect-shop-stats-list.list-group
  .list-group-item(
    v-for="stat in stats"
    :key="stat.id"
    @click="$emit('click', stat)"
  )
    .texts
      .name(v-text="stat.name")
      .address(v-text="stat.address")
      //.comment(v-if="outlet.commentText")
        i.el-icon-info
        span.comment-text(v-text="outlet.commentText")
    .status
      .level {{ stat.level || '-' }}
      .progress {{ stat.blocksProgress }}
      .progress {{ stat.assortmentsProgress }}

</template>
<script>

const NAME = 'PerfectShopStatsList';

export default {
  props: {
    stats: Array,
  },
  name: NAME,
};

</script>
<style scoped lang="scss">

@import "../../styles/outletList";

.status {
  display: flex;
  flex-direction: row;
  align-items: center;
  > * {
    width: 80px;
    text-align: center;
  }
}

.list-group-item {
  page-break-inside: avoid;
}

</style>

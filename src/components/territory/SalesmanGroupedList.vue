<template lang="pug">

.salesman-grouped-list

  .list-group(v-for="group in groupedItems" :key="group.id")

    .list-group-header
      .name {{ group.name }}

    .list-group-item(
      v-for="item in group.items" :key="item.id"
      @click.prevent="itemClick(item)"
      :class="value && value.id === item.id && 'active'"
    )
      span.name {{ item.name }}
      .badge
        span(v-text="item.count()")

</template>
<script>


export default {

  name: 'SalesmanGroupedList',

  props: {
    groupedItems: Array,
    value: Object,
  },

  computed: {},

  methods: {
    itemClick(item) {
      // const { value } = this;
      this.$emit('input', item);
    },
  },

};

</script>
<style scoped lang="scss">

@import "../../styles/badge";

.list-group-header {
  display: flex;
  justify-content: space-between;
}

.list-group-item {
  display: flex;
  align-items: center;
  .name {
    flex: 1;
  }
}

.badge {
  @extend %badge;
}

</style>

<template lang="pug">

.sales-target-group-list

  .list-group(v-for="group in groupedItems" :key="group.name")

    .list-group-header {{ group.name }}

    .list-group-item.sales-target-group(
    v-for="item in group.items" :key="item.id"
    @click.prevent="itemClick(item)"
    :class="value && value.id === item.id && 'active'"
    )
      span.name {{ item.name }}

</template>
<script>

import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import map from 'lodash/map';

export default {

  name: 'SalesTargetGroupList',

  props: {
    items: Array,
    value: Object,
  },

  computed: {

    groupedItems() {

      const data = groupBy(this.items, 'articleGroup.name');

      return orderBy(map(data, (items, name) => ({
        name,
        items,
      })), 'name');

    },

  },

  methods: {
    itemClick(item) {
      // const { value } = this;
      this.$emit('input', item);
    },
  },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

</style>

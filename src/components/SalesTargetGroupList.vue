<template lang="pug">

.sales-target-group-list

  .list-group(v-for="group in groupedItems" :key="group.id")

    .list-group-header
      .name {{ group.name }}
      el-button.add(
      size="medium"
      type="text"
      icon="el-icon-circle-plus-outline"
      @click="$emit('add', group)"
      )

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
import get from 'lodash/get';

import ArticleGroup from '@/models/ArticleGroup';

export default {

  name: 'SalesTargetGroupList',

  props: {
    items: Array,
    value: Object,
  },

  computed: {

    groupedItems() {

      const data = groupBy(this.items, 'articleGroup.id');

      return orderBy(map(data, (items, id) => ({
        id,
        name: get(ArticleGroup.get(id), 'name'),
        items: orderBy(items, 'name'),
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

.list-group-header {
  display: flex;
  justify-content: space-between;
}

.add {
  padding: 0;
}

</style>

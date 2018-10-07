<template lang="pug">

.list-group.catalogue-groups-list

  .list-group-item(
  v-for="parent in parents" :key="parent.id"
  @click.prevent="parentClick(parent)"
  :class="value && value.id === parent.id && 'active'"
  )
    i.el-icon-arrow-left
    span {{ parent.name }}

  .list-group-item(
  v-for="item in items" :key="item.id"
  @click.prevent="parentClick(item)"
  :class="value && value.id === item.id && 'active'"
  )
    span {{ item.name }}

</template>
<script>

export default {

  name: 'CatalogueGroupList',

  props: ['items', 'parents', 'value'],

  methods: {
    parentClick(parent) {
      const { value } = this;
      this.$emit('input', (value && parent.id === value.id) ? parent.parent : parent);
    },
  },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

</style>

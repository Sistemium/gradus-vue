<template lang="pug">

.list-group.catalogue-groups-list

  .list-group-item(
  v-for="parent in parents" :key="parent.id"
  @click.prevent="parentClick(parent)"
  )
    i.el-icon-arrow-left
    span {{ parent.name }}

  .list-group-item(
  v-for="item in items" :key="item.id"
  @click.prevent="$emit('input', item)"
  )
    span {{ item.name }}

</template>
<script>

export default {

  name: 'CatalogueGroupList',

  props: ['items', 'parents', 'value'],

  methods: {
    parentClick(parent) {
      this.$emit('input', parent.id === this.value.id ? parent.parent : parent);
    },
  },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

</style>

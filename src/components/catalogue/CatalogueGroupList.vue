<template lang="pug">

resize.list-group.catalogue-groups-list.filters(
v-if="items.length || parents.length"
:padding="35"
)

  .list-group-item.parent(
  v-for="parent in parents" :key="parent.id"
  @click.prevent="itemClick(parent)"
  :class="value && value.id === parent.id && 'active'"
  )
    i.el-icon-arrow-left
    span {{ parent.name }}

  .list-group-item.item(
  v-for="item in items" :key="item.id"
  @click.prevent="itemClick(item)"
  v-if="notEmpty(item)"
  :class="value && value.id === item.id && 'active'"
  )
    span.label {{ item.name }}
    .badge(v-if="item.hasArticles()")
      span {{ item.hasArticles() }}
    i.el-icon-arrow-right(v-if="item.children && item.children.length")

</template>
<script>

export default {

  name: 'CatalogueGroupList',

  props: ['items', 'parents', 'value'],

  methods: {

    itemClick(item) {
      const { value } = this;
      this.$emit('input', (value && item.id === value.id) ? item.parent : item);
    },

    notEmpty(item) {
      return (item.children && item.children.length) || (item.articles && item.articles.length);
    },

  },

};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.item {
  display: flex;
  align-items: center;
  .label {
    flex: 1;
  }
}

.badge span {
  background-color: $gray-background;
  border-radius: 10px;
  padding: 3px 6px;
  display: inline-block;
  text-align: center;
  color: $black;
}

</style>

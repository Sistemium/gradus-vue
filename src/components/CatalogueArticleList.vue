<template lang="pug">

resize.list-group.catalogue-article-list(v-if="items.length" padding="30")

  .list-group-item(
  v-for="article in items" :key="article.id"
  @click.prevent="$emit('input', article)"
  :class="value && value.id === article.id && 'active'"
  )
    span {{ article.name }}

</template>
<script>

export default {
  name: 'CatalogueArticleList',
  props: ['items', 'value'],
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

</style>

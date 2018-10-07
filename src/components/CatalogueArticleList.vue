<template lang="pug">

.list-group.catalogue-article-list(v-if="items.length")

  .list-group-item(
  v-for="article in items" :key="article.id"
  @click.prevent="$emit('input', article)"
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

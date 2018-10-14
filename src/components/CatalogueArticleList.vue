<template lang="pug">

resize.list-group.catalogue-article-list(v-if="items.length" padding="35")

  catalogue-article.list-group-item(
  v-for="article in items"
  :key="article.id"
  :class="value && value.id === article.id && 'active'"
  :article="article"
  @input="$emit('input', article)"
  @avatar-click="$emit('avatar-click', article)"
  )

</template>
<script>

import CatalogueArticle from './CatalogueArticle.vue';

export default {

  name: 'CatalogueArticleList',

  props: {
    items: Array,
    value: Object,
    shareItems: Object,
  },

  components: {
    CatalogueArticle,
  },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.list-group-item {
  display: flex;
  padding: $margin-right;
}

</style>

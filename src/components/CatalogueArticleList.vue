<template lang="pug">

resize.list-group.catalogue-article-list(v-if="items.length" padding="35")

  catalogue-article.list-group-item(
  v-for="article in groupedItems()"
  :key="article.id"
  :article="article"
  @avatar-click="$emit('avatar-click', article)"
  )

</template>
<script>

import Article from '@/models/Article';
import { groupedArticles } from '@/services/catalogue';
import CatalogueArticle from './CatalogueArticle.vue';

export default {

  name: 'CatalogueArticleList',

  props: {
    items: Array,
  },

  methods: {
    groupedItems() {
      return groupedArticles(this.items);
    },
  },

  created() {
    Article.bind(this);
  },

  beforeDestroy() {
    Article.unbindAll(this);
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

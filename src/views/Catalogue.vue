<template lang="pug">

el-container.catalogue

  el-header(height="34px")
    el-breadcrumb(separator-class="el-icon-arrow-right")
      el-breadcrumb-item
        a(@click.prevent="currentArticleGroup = null") Все товары
      el-breadcrumb-item(
      v-for="parent in currentArticleGroupParents"
      :key="parent.id"
      )
        a(@click.prevent="currentArticleGroup = parent") {{ parent.name }}

  el-container

    el-aside.filters
      catalogue-group-list(
      :items="articleGroups"
      :parents="currentArticleGroupParents"
      v-model="currentArticleGroup"
      )
    el-main.articles
      catalogue-article-list(
      :items="articles"
      v-model="currentArticle"
      )

</template>
<script>

import ArticleGroup from '@/models/ArticleGroup';
import Article from '@/models/Article';

import CatalogueGroupList from '@/components/CatalogueGroupList.vue';
import CatalogueArticleList from '@/components/CatalogueArticleList.vue';

export default {

  name: 'Catalogue',

  data() {
    return {
      articles: [],
      articleGroups: [],
      currentArticle: null,
      currentArticleGroup: null,
      currentArticleGroupParents: [],
    };
  },

  computed: {},

  async created() {
    this.$watch('currentArticleGroup', this.bindCurrent, { immediate: true });
    await ArticleGroup.findAll({ limit: 10000 });
    await Article.findAll({ limit: 20000 });
  },

  methods: {

    bindCurrent() {
      const { id: articleGroupId = null } = this.currentArticleGroup || {};
      const filter = {
        articleGroupId,
        orderBy: 'name',
      };

      ArticleGroup.bindAll(this, filter, 'articleGroups');
      Article.bindAll(this, filter, 'articles');

      if (articleGroupId) {
        this.currentArticleGroupParents = [
          ...this.currentArticleGroup.parents(),
          this.currentArticleGroup,
        ];
      } else {
        this.currentArticleGroupParents = [];
      }
    },

  },

  components: {
    CatalogueGroupList,
    CatalogueArticleList,
  },

  beforeDestroy() {
    ArticleGroup.unbindAll(this);
    Article.unbindAll(this);
  },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.articles {
  padding: 0;
  margin-left: $margin-right * 2;
}

</style>

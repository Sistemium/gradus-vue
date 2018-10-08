<template lang="pug">

el-container.catalogue

  el-header.catalogue-header

    el-breadcrumb(separator-class="el-icon-arrow-right")

      el-breadcrumb-item
        a(@click.prevent="currentArticleGroup = null") Все товары

      el-breadcrumb-item(
      v-for="parent in currentArticleGroupParents"
      :key="parent.id"
      )
        a(@click.prevent="currentArticleGroup = parent") {{ parent.name }}

    el-input.searcher(
    prefix-icon="el-icon-search"
    v-model="searchText"
    debounce="750"
    placeholder="поиск"
    )

  el-container

    el-aside
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
      searchText: '',
    };
  },

  computed: {},

  async created() {
    const loading = this.$loading.show();
    await ArticleGroup.findAll({ limit: 10000 });
    await Article.findAll({
      limit: 20000,
      'x-offset:': '*',
    });
    loading.hide();
    this.$watch('currentArticleGroup', this.bindCurrent, { immediate: true });
  },

  methods: {

    bindCurrent() {
      const { id: articleGroupId = null, children = [] } = this.currentArticleGroup || {};
      const filter = {
        articleGroupId,
        orderBy: 'name',
      };

      if (children.length || !articleGroupId) {
        ArticleGroup.bindAll(this, filter, 'articleGroups');
      }

      Article.bindAll(this, filter, 'articles');

      if (articleGroupId) {
        if (children.length) {
          this.currentArticleGroupParents = [
            ...this.currentArticleGroup.parents(),
            this.currentArticleGroup,
          ];
        }
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

.filters {
  /*width: 300px;*/
}

.catalogue-header {
  margin-top: -20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /*padding-left: 0;*/
  padding-right: 0;
}

.searcher {
  max-width: 200px;
}

</style>

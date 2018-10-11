<template lang="pug">

el-container.catalogue

  el-header.catalogue-header(height="")

    el-breadcrumb.crumbs(separator-class="el-icon-arrow-right")

      el-breadcrumb-item
        a(@click.prevent="currentArticleGroup = null") Все товары

      el-breadcrumb-item(
      v-for="parent in currentArticleGroupParents"
      :key="parent.id"
      )
        a(@click.prevent="currentArticleGroup = parent") {{ parent.name }}

    .stats
      span Товаров:
      strong {{ articles.length }}

    el-input.searcher(
    prefix-icon="el-icon-search"
    v-model="searchText"
    :clearable="true"
    placeholder="поиск"
    )

  el-container.catalogue-main(
  v-loading="loading"
  element-loading-text="Загрузка данных ..."
  )

    el-aside(v-if="!loading")
      catalogue-group-list(
      :items="articleGroups"
      :parents="currentArticleGroupParents"
      v-model="currentArticleGroup"
      )

    el-main.articles(v-if="!loading")

      catalogue-article-list(
      v-if="articles.length"
      :items="articles"
      v-model="currentArticle"
      @avatar-click="onArticleAvatarClick"
      )

      .empty(
      v-else
      )
        p Подходящие товары не найдены

  el-dialog(
  :title="currentArticle && currentArticle.name"
  :fullscreen="true"
  :show-close="true"
  :visible.sync="showGallery"
  custom-class="el-dialog-gallery"
  center
  )
    picture-gallery(
    v-if="showGallery"
    @image-click="closeGallery"
    :image="currentArticle && currentArticle.avatarPicture"
    )


</template>
<script>

import filter from 'lodash/filter';
import debounce from 'lodash/debounce';
import ArticleGroup from '@/models/ArticleGroup';
import Article from '@/models/Article';

import * as svc from '@/services/catalogue';

import CatalogueGroupList from '@/components/CatalogueGroupList.vue';
import CatalogueArticleList from '@/components/CatalogueArticleList.vue';
import PictureGallery from '@/components/PictureGallery.vue';

import log from 'sistemium-telegram/services/log';

const { debug } = log('catalogue');

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
      loading: false,
      filteredGroups: [],
      showGallery: false,
    };
  },

  computed: {},

  async created() {
    this.loading = true;
    await svc.loadData();
    this.loading = false;
    this.$watch('currentArticleGroup', this.bindCurrent);
    this.$watch('searchText', debounce(this.bindArticles, 750));
    this.bindArticles();
  },

  methods: {

    bindArticles() {

      this.filteredGroups = svc.articleGroupsBySearch(this.searchText);
      this.bindCurrent();
    },

    bindCurrent() {
      const { id: articleGroupId = null, children = [] } = this.currentArticleGroup || {};

      if (children.length || !articleGroupId) {
        this.articleGroups = filter(this.filteredGroups, g => g.articleGroupId === articleGroupId);
        debug('bindCurrent', this.articleGroups.length, articleGroupId, children.length);
      }

      this.articles = svc.articlesByGroupID(this.currentArticleGroup, this.searchText);

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

    onArticleAvatarClick(article) {
      debug('onArticleAvatarClick', article);
      this.showGallery = true;
      this.currentArticle = article;
    },

    closeGallery() {
      this.showGallery = false;
    },

  },

  components: {
    PictureGallery,
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

.catalogue-header {

  height: 70px;
  margin-top: -20px;
  display: flex;
  align-items: center;
  padding-right: 0;

  .crumbs {
    flex: 1;
  }

  .stats {
    margin: auto $margin-top;
    strong {
      margin-left: $margin-right;
    }
  }

}

.catalogue-main {
  min-height: 300px;
}

.searcher {
  max-width: 200px;
}

.empty {
  text-align: center;
  font-size: 150%;
}

</style>

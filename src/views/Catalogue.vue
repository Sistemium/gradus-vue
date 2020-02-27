<template lang="pug">

el-container.catalogue(
  no-v-loading.fullscreen.lock="loading || busy"
  element-loading-text="Загрузка данных ..."
)

  el-header.catalogue-header(height="")

    el-breadcrumb.crumbs(separator-class="el-icon-arrow-right")

      el-breadcrumb-item
        a(@click.prevent="currentArticleGroup = null") Все товары

      el-breadcrumb-item(
        v-for="parent in groupsData.parents"
        :key="parent.id"
      )
        a(@click.prevent="currentArticleGroup = parent") {{ parent.name }}

    el-dropdown.selected(v-if="sharedArticles.length")
      a.el-dropdown-link
        span Выбрано:
        strong {{ sharedArticles.length }}
        i.el-icon-arrow-down.el-icon--right
      el-dropdown-menu(slot="dropdown")
        el-dropdown-item(
          v-for="article in selectedArticles" :key="article.id"
        ) {{ article.name }}

    .stats
      el-popover(
        placement="bottom"
        width="100"
        trigger="click"
      )
        span Без картинки:
        el-switch.image-filter(v-model="onlyNoAvatar")
        el-button(slot="reference") Фильтры

    search-input.searcher(v-model="searchText")

  el-container.catalogue-main(
    v-loading="loading"
    element-loading-text="Загрузка данных ..."
  )

    el-aside(v-if="!loading")
      catalogue-group-list(
        :items="articleGroups"
        :parents="groupsData.parents"
        v-model="currentArticleGroup"
      )

    el-main.articles(v-if="!loading")

      catalogue-article-list(
        v-if="articles.length"
        :items="articles"
      )

      .empty(
        v-else
      )
        p Подходящие товары не найдены

  catalogue-article-dialog(
    v-if="fullScreenArticle"
    :article="fullScreenArticle"
    :picture-model="ArticlePicture"
    @closed="closeGallery()"
  )

</template>
<script>

import { createNamespacedHelpers } from 'vuex';

import * as getters from '@/vuex/catalogue/getters';
import * as actions from '@/vuex/catalogue/actions';

import * as svc from '@/services/catalogue';

import CatalogueGroupList from '@/components/catalogue/CatalogueGroupList.vue';
import CatalogueArticleList from '@/components/catalogue/CatalogueArticleList.vue';
import CatalogueArticleDialog from '@/components/catalogue/CatalogueArticleDialog.vue';

import ArticlePicture from '@/models/ArticlePicture';

const { mapActions, mapGetters } = createNamespacedHelpers('catalogue');

export default {

  name: 'Catalogue',

  data() {
    return {
      loading: false,
      message: null,
      ArticlePicture,
    };
  },

  computed: {
    ...mapGetters({
      sharedArticles: getters.SHARED_ARTICLES,
      fullScreenArticle: getters.AVATAR_ARTICLE,
      busy: getters.BUSY,
    }),
    searchText: {
      ...mapGetters({ get: getters.SEARCH_TEXT }),
      ...mapActions({ set: actions.SEARCH_TEXT_CHANGE }),
    },
    currentArticleGroup: {
      ...mapGetters({ get: getters.ARTICLE_GROUP }),
      ...mapActions({ set: actions.ARTICLE_GROUP_CLICK }),
    },
    onlyNoAvatar: {
      ...mapGetters({ get: getters.IMAGE_FILTER }),
      ...mapActions({ set: actions.IMAGE_FILTER_TOGGLE }),
    },
    selectedArticles() {
      return svc.getArticles(this.sharedArticles);
    },
    articles() {
      const { searchText, onlyNoAvatar } = this;
      return svc.articlesByGroupID(this.currentArticleGroup, {
        searchText,
        onlyNoAvatar,
      });
    },
    filteredGroups() {
      return svc.articleGroupsByArticles(this.articles);
    },
    articleGroups() {
      return this.groupsData.groups;
    },
    groupsData() {
      const { currentArticleGroup, articles, filteredGroups } = this;
      return svc.catalogueArticleGroups(currentArticleGroup, articles, filteredGroups);
    },
  },

  async created() {

    this.loading = true;
    await svc.loadData();
    this.loading = false;

  },

  methods: {
    ...mapActions({ closeGallery: actions.ARTICLE_AVATAR_CLICK }),
  },

  watch: {
    busy(isBusy) {
      const { message: currentMessage } = this;
      if (currentMessage) {
        currentMessage.close();
      }
      if (isBusy) {
        this.message = this.$message({
          message: 'Загрузка данных ...',
          type: 'warning',
          duration: 0,
        });
      }
    },
  },

  components: {
    CatalogueArticleDialog,
    CatalogueGroupList,
    CatalogueArticleList,
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

  .stats, .selected {
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

.el-popper {
  max-width: 500px;

  li {
    font-size: 85%;
  }
}

.image-filter {

  float: right;

}

</style>

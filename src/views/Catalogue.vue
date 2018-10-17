<template lang="pug">

el-container.catalogue

  catalogue-article-dialog(
  v-if="fullScreenArticle"
  :article="fullScreenArticle"
  @closed="closeGallery()"
  )

  el-header.catalogue-header(height="")

    el-breadcrumb.crumbs(separator-class="el-icon-arrow-right")

      el-breadcrumb-item
        a(@click.prevent="currentArticleGroup = null") Все товары

      el-breadcrumb-item(
      v-for="parent in currentArticleGroupParents"
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
      )

      .empty(
      v-else
      )
        p Подходящие товары не найдены

</template>
<script>

import { createNamespacedHelpers } from 'vuex';

import * as getters from '@/vuex/catalogue/getters';
import * as actions from '@/vuex/catalogue/actions';

import * as svc from '@/services/catalogue';

import CatalogueGroupList from '@/components/CatalogueGroupList.vue';
import CatalogueArticleList from '@/components/CatalogueArticleList.vue';
import CatalogueArticleDialog from '@/components/CatalogueArticleDialog.vue';

const { mapActions, mapGetters } = createNamespacedHelpers('catalogue');

export default {

  name: 'Catalogue',

  data() {
    return {
      articles: [],
      articleGroups: [],
      currentArticleGroupParents: [],
      loading: false,
      filteredGroups: [],
    };
  },

  computed: {
    ...mapGetters({
      sharedArticles: getters.SHARED_ARTICLES,
      fullScreenArticle: getters.AVATAR_ARTICLE,
    }),
    searchText: {
      ...mapGetters({ get: getters.SEARCH_TEXT }),
      ...mapActions({ set: actions.SEARCH_TEXT_CHANGE }),
    },
    currentArticleGroup: {
      ...mapGetters({ get: getters.ARTICLE_GROUP }),
      ...mapActions({ set: actions.ARTICLE_GROUP_CLICK }),
    },
    selectedArticles() {
      return svc.getArticles(this.sharedArticles);
    },
  },

  async created() {
    this.loading = true;
    await svc.loadData();
    this.loading = false;
    this.$watch('currentArticleGroup', this.bindCurrent);
    this.$watch('searchText', this.bindArticles, { immediate: true });
  },

  methods: {

    ...mapActions({ closeGallery: actions.ARTICLE_AVATAR_CLICK }),

    bindArticles() {

      this.filteredGroups = svc.articleGroupsBySearch(this.searchText);
      this.bindCurrent();
    },

    bindCurrent() {

      const data = svc.catalogueData(
        this.currentArticleGroup,
        this.searchText,
        this.filteredGroups,
      );

      this.currentArticleGroupParents = data.parents;
      this.articles = data.articles;
      this.articleGroups = data.groups;

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

</style>

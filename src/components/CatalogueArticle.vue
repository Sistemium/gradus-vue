<template lang="pug">

.catalogue-article(
@click="toggleSelected(article)"
:class="{active: isSelected}"
)

  avatar-picture(
  @click.native.prevent.stop="avatarClick(article)"
  :imageSrc ="thumbnailSrc(article)"
  )

  .main

    .title
      span {{ article.name }}
      span {{ article.extraLabel }}

    .sub-title
      small.same-articles(v-if="!showSame && hasSameArticles()") +{{ hasSameArticles() }}

    same-articles-list(
    v-if="showSame"
    @remove-click="removeSameClick"
    )

  .buttons

    el-button(
    v-if="isSelected && sharedArticles.length && !isSelectedToShare"
    circle
    size="mini"
    icon="el-icon-circle-plus-outline"
    type="warning"
    @click.prevent.stop="shareWithArticle(article)"
    )

    el-button(
    v-if="!isSelected && !hasSameArticles()"
    circle
    size="mini"
    :icon="isSelectedToShare ? 'el-icon-circle-check' : 'el-icon-share'"
    :type="isSelectedToShare ? 'success' : 'default'"
    @click.prevent.stop="toggleShare(article)"
    )

</template>
<script>

import { createNamespacedHelpers } from 'vuex';
import ManagedComponent from '@/lib/ManagedComponent';
import Article from '@/models/Article';

import { TOGGLE_ARTICLE_SHARE } from '@/vuex/catalogue/mutations';
import { SHARED_ARTICLES, SELECTED_ARTICLE } from '@/vuex/catalogue/getters';
import * as a from '@/vuex/catalogue/actions';

import AvatarPicture from './AvatarPicture.vue';
import SameArticlesList from './SameArticlesList.vue';

const vuex = createNamespacedHelpers('catalogue');

/**
 * @property {String} article.name
 * @property {String} article.id
 * @property {String} article.extraLabel
 * @property {Array} article.sameArticles
 * @property {Object} article.avatarPicture.thumbnailSrc
 */

export default {

  name: 'CatalogueArticle',

  props: {
    article: Object,
  },

  // models: [Article],

  // data() {
  //   return {
  //
  //   };
  // },

  computed: {

    ...vuex.mapState({
      isSelected(state) {
        const { article } = this;
        const selectedId = state[SELECTED_ARTICLE];
        return selectedId === article.id;
      },
      sharedArticles: SHARED_ARTICLES,
    }),

    showSame() {
      return this.isSelected;
    },

    isSelectedToShare() {
      const { sharedArticles, article } = this;
      return sharedArticles && sharedArticles.indexOf(article.id) !== -1;
    },

  },

  methods: {

    ...vuex.mapMutations({
      toggleShare: TOGGLE_ARTICLE_SHARE,
    }),

    ...vuex.mapActions({
      toggleSelected: a.TOGGLE_ARTICLE_SELECTED,
      shareWithArticle: a.SHARE_WITH_ARTICLE,
      avatarClick: a.ARTICLE_AVATAR_CLICK,
      removeSameClick: a.REMOVE_SAME_ARTICLE,
    }),

    thumbnailSrc(article) {
      return article.avatarPicture && article.avatarPicture.thumbnailSrc;
    },

    hasSameArticles() {
      const { article } = this;
      return article.sameArticles && article.sameArticles.length;
    },

    rebind(article) {
      Article.unbindAll(this);
      if (article) {
        Article.bindOne(this, article.id);
      }
    },

  },

  created() {

    this.$watch('article', this.rebind, { immediate: !!this.article });

  },

  beforeDestroy() {
    // Article.unbindAll(this);
  },

  components: {
    AvatarPicture,
    SameArticlesList,
  },

  mixins: [ManagedComponent],

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.main {

  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .title {

    margin-right: $margin-right;

    > * + * {
      margin-left: $margin-right;
    }

  }

  .operations {
    font-size: 80%;
  }

}


</style>

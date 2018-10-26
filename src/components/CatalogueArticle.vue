<template lang="pug">

.catalogue-article(
@click="toggleSelected(article)"
:class="{active: isSelected, 'has-same': sameArticles.length}"
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
      small.same-articles(v-if="!showSame && sameArticles.length") +{{ sameArticles.length }}
    .same-articles(v-if="showSame")
      .same-article(v-for="same in sameArticles" :key="same.id")
        span.remove-same(@click.prevent.stop="removeSameClick(same)") ❌
        span {{ same.name }}
        span {{ same.extraLabel }}

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
    v-if="!isSelected && !sameArticles.length"
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
// import Article from '@/models/Article';

import { TOGGLE_ARTICLE_SHARE, TOGGLE_ARTICLE_SELECTED } from '@/vuex/catalogue/mutations';
import { SHARED_ARTICLES, SELECTED_ARTICLE } from '@/vuex/catalogue/getters';
import * as a from '@/vuex/catalogue/actions';

import AvatarPicture from './AvatarPicture.vue';

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
        const selected = state[SELECTED_ARTICLE] || {};
        return selected.id === article.id;
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

    sameArticles() {
      const { article } = this;
      return article.sameArticles;
    },

  },

  methods: {

    ...vuex.mapMutations({
      toggleShare: TOGGLE_ARTICLE_SHARE,
      toggleSelected: TOGGLE_ARTICLE_SELECTED,
    }),

    ...vuex.mapActions({
      shareWithArticle: a.SHARE_WITH_ARTICLE,
      avatarClick: a.ARTICLE_AVATAR_CLICK,
      removeSameClick: a.REMOVE_SAME_ARTICLE,
    }),

    thumbnailSrc(article) {
      return article.avatarPicture && article.avatarPicture.thumbnailSrc;
    },

  },

  created() {
    // Article.bindOne(this, this.article.id);
  },

  beforeDestroy() {
    // Article.unbindAll(this);
  },

  components: {
    AvatarPicture,
  },

  mixins: [ManagedComponent],

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.same-article {

  font-size: 75%;
  margin-top: $margin-top/3;

  .remove-same {

    padding: 6px 6px 6px 8px;

    &:hover {
      //font-weight: bold;
      background-color: $white;
      border-radius: $border-radius;
    }
    margin-right: $margin-right;
    color: $red;
  }

}

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

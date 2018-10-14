<template lang="pug">

.catalogue-article(@click="$emit('input')")
  .avatar(@click.prevent.stop="$emit('avatar-click')")
    img.placeholder(v-if="!thumbnailSrc(article)" src="../assets/placeholder.png")
    img(:src="thumbnailSrc(article)" v-else)
  .main
    .title
      span {{ article.name }}
      span {{ article.extraLabel }}
    .operations(v-if="operations")
      a.article-operation(@click.prevent.stop="shareWithArticle(article)") Объединить
  .buttons
    el-button(
    circle
    size="mini"
    :icon="isSelectedToShare ? 'el-icon-circle-check' : 'el-icon-share'"
    :type="isSelectedToShare ? 'success' : 'default'"
    @click.prevent.stop="toggleShare(article)"
    )

</template>
<script>

import * as vuex from 'vuex';

import { TOGGLE_ARTICLE_SHARE } from '@/vuex/catalogue/mutations';
import { SHARED_ARTICLES } from '@/vuex/catalogue/getters';
import { SHARE_WITH_ARTICLE } from '@/vuex/catalogue/actions';

export default {

  name: 'CatalogueArticle',

  props: {
    /**
     * @property {String} article.name
     * @property {String} article.extraLabel
     * @property {Object} article.avatarPicture.thumbnailSrc
     */
    article: Object,
  },

  computed: {

    ...vuex.mapGetters('catalogue', { sharedArticles: SHARED_ARTICLES }),

    isSelectedToShare() {
      const { sharedArticles, article } = this;
      return sharedArticles && sharedArticles.indexOf(article.id) !== -1;
    },

    operations() {
      const { sharedArticles, isSelectedToShare } = this;
      return !isSelectedToShare && sharedArticles.length && sharedArticles;
    },

  },

  methods: {

    ...vuex.mapMutations('catalogue', { toggleShare: TOGGLE_ARTICLE_SHARE }),
    ...vuex.mapActions('catalogue', { shareWithArticle: SHARE_WITH_ARTICLE }),

    thumbnailSrc(article) {
      return article.avatarPicture && article.avatarPicture.thumbnailSrc;
    },

  },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

$avatar-size: 50px;

.avatar {

  cursor: zoom-in;
  min-width: $avatar-size;
  min-height: $avatar-size;
  text-align: center;
  margin-right: $margin-right;

  img {
    max-width: $avatar-size;
    max-height: $avatar-size;
  }

}

.main {

  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .title {

    > * + * {
      margin-left: $margin-right;
    }

  }

  .operations {
    font-size: 80%;
  }

}


</style>

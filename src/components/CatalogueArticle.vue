<template lang="pug">

.catalogue-article(@click="$emit('input')")
  .avatar(@click.prevent.stop="$emit('avatar-click')")
    img.placeholder(v-if="!thumbnailSrc(article)" src="../assets/placeholder.png")
    img(:src="thumbnailSrc(article)" v-else)
  .title
    span {{ article.name }}
    span {{ article.extraLabel }}
  .buttons
    el-button(
    circle
    size="mini"
    :icon="isSelectedToShare ? 'el-icon-circle-check' : 'el-icon-share'"
    @click.prevent.stop="toggleShare(article)"
    )

</template>
<script>

import { mapGetters, mapMutations } from 'vuex';

import { TOGGLE_ARTICLE_SHARE } from '@/vuex/catalogue/mutations';
import { SHARED_ARTICLES } from '@/vuex/catalogue/getters';

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
    ...mapGetters('catalogue', { sharedArticles: SHARED_ARTICLES }),
    isSelectedToShare() {
      const { sharedArticles, article } = this;
      return sharedArticles && sharedArticles.indexOf(article.id) !== -1;
    },
  },

  methods: {
    thumbnailSrc(article) {
      return article.avatarPicture && article.avatarPicture.thumbnailSrc;
    },
    ...mapMutations('catalogue', { toggleShare: TOGGLE_ARTICLE_SHARE }),
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

.title {

  flex: 1;

  > * + * {
    margin-left: $margin-right;
  }

}


</style>

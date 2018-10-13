<template lang="pug">

.catalogue-article(@click="$emit('input', article)")
  .avatar(@click.prevent.stop="$emit('avatar-click', article)")
    img.placeholder(v-if="!thumbnailSrc(article)" src="../assets/placeholder.png")
    img(:src="thumbnailSrc(article)" v-else)
  .title
    span {{ article.name }}
    span {{ article.extraLabel }}

</template>
<script>

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

  methods: {
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

.title > * + * {
  margin-left: $margin-right;
}

</style>

<template lang="pug">

resize.list-group.catalogue-article-list(v-if="items.length" padding="35")

  .list-group-item(
  v-for="article in items" :key="article.id"
  @click.prevent="$emit('input', article)"
  :class="value && value.id === article.id && 'active'"
  )
    span.avatar(@click.prevent.stop="avatarClick(article)")
      img.placeholder(v-if="!thumbnailSrc(article)" src="../assets/placeholder.png")
      img(:src="thumbnailSrc(article)" v-else)
    span {{ article.name }}
    span {{ article.extraLabel }}

</template>
<script>

export default {

  name: 'CatalogueArticleList',

  props: {
    items: Array,
    value: Object,
    avatarClick: Function,
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

.list-group-item {
  display: flex;
  padding: $margin-right;
  > * + * {
    margin-left: $margin-right;
  }
}

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

</style>

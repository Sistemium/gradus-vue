<template lang="pug">

resize.list-group.catalogue-article-list(v-if="items.length" padding="35")

  .list-group-item(
  v-for="article in items" :key="article.id"
  @click.prevent="$emit('input', article)"
  :class="value && value.id === article.id && 'active'"
  )
    span.avatar(@click.prevent.stop="avatarClick(article)")
      .img-placeholder(v-if="!article.avatarPicture")
      img(:src="article.avatarPicture.thumbnailSrc" v-else)
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
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.list-group-item {
  display: flex;
  > * + * {
    margin-left: $margin-right;
  }
}

.avatar {
  cursor: zoom-in;
  min-width: 40px;
  min-height: 40px;
  text-align: center;
  margin-right: $margin-right;
  img {
    max-width: 40px;
    max-height: 40px;
  }
}

</style>

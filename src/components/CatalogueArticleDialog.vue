<template lang="pug">

el-dialog(
:title="article.name"
:fullscreen="true"
:show-close="true"
:visible.sync="visible"
custom-class="el-dialog-gallery"
@closed="closeDialog()"
center
)
  picture-gallery(
  @image-click="closeDialog()"
  :image="image"
  )

</template>
<script>

import PictureGallery from './PictureGallery.vue';

export default {

  name: 'CatalogueArticleDialog',

  props: {
    article: Object,
  },

  data() {
    return { visible: true };
  },

  computed: {
    image() {
      const { avatarPicture } = this.article;
      return avatarPicture;
    },
  },

  methods: {
    closeDialog() {
      this.visible = false;
      this.$emit('closed');
    },
  },

  components: {
    PictureGallery,
  },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

</style>

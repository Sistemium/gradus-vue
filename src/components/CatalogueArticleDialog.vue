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
  :model="ArticlePicture"
  :new-image-properties="newImageProperties"
  @uploaded="onUpload"
  )

</template>
<script>

import pick from 'lodash/pick';
import ArticlePicture from '@/models/ArticlePicture';
import Article from '@/models/Article';
import PictureGallery from './PictureGallery.vue';

export default {

  name: 'CatalogueArticleDialog',

  props: {
    article: Object,
  },

  data() {
    return {
      visible: true,
      ArticlePicture,
    };
  },

  computed: {
    image() {
      const { avatarPicture } = this.article;
      return avatarPicture;
    },
    newImageProperties() {
      return pick(this.article, ['name']);
    },
  },

  methods: {
    closeDialog() {
      this.visible = false;
      this.$emit('closed');
    },
    async onUpload(articlePicture) {
      this.article.avatarPictureId = articlePicture.id;
      await Article.safeSave(this.article, true);
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

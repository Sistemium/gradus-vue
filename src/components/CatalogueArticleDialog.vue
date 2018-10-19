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
  v-loading="busy"
  element-loading-text="Обработка изображения ..."
  @image-click="closeDialog()"
  :image="image"
  :model="ArticlePicture"
  :new-image-properties="newImageProperties"
  @uploaded="onUpload"
  )

</template>
<script>

import pick from 'lodash/pick';
import log from 'sistemium-telegram/services/log';

import ManagedComponent from '@/lib/ManagedComponent';

import ArticlePicture from '@/models/ArticlePicture';
import Article from '@/models/Article';

import PictureGallery from './PictureGallery.vue';

const { debug } = log('CatalogueArticleDialog.vue');

export default {

  name: 'CatalogueArticleDialog',

  props: {
    article: Object,
  },

  models: [Article, ArticlePicture],

  data() {
    return {
      busy: false,
      image: undefined,
      visible: true,
      ArticlePicture,
    };
  },

  computed: {
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
      this.busy = true;
      this.$set(this.article, 'avatarPictureId', articlePicture.id);
      await Article.safeSave(this.article, true);
      this.updateImage(articlePicture.id);
      this.busy = false;
    },
    updateImage(avatarPictureId) {
      debug('watch', avatarPictureId);
      if (!avatarPictureId) {
        this.image = undefined;
        return;
      }
      ArticlePicture.bindOne(this, avatarPictureId, 'image');
    },
  },

  created() {
    this.$watch('article.avatarPictureId', this.updateImage, { immediate: true });
  },

  components: {
    PictureGallery,
  },

  mixins: [ManagedComponent],

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

</style>

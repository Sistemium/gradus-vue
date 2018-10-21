<template lang="pug">

el-dialog(
:title="article.name"
:fullscreen="true"
:show-close="true"
:visible.sync="visible"
custom-class="el-dialog-gallery"
@closed="closeDialog()"
:append-to-body="true"
center
)
  picture-gallery(
  v-loading="busy"
  element-loading-text="Обработка изображения ..."
  @image-click="closeDialog()"
  :images="images"
  :model="ArticlePicture"
  :new-image-properties="newImageProperties"
  @uploaded="onUpload"
  )

</template>
<script>

import pick from 'lodash/pick';

import { createNamespacedHelpers } from 'vuex';
import * as g from '@/vuex/catalogue/getters';
import * as a from '@/vuex/catalogue/actions';

import log from 'sistemium-telegram/services/log';
import ManagedComponent from '@/lib/ManagedComponent';
import ArticlePictureArticle from '@/models/ArticlePictureArticle';
import ArticlePicture from '@/models/ArticlePicture';
import Article from '@/models/Article';
import PictureGallery from './PictureGallery.vue';

const { debug, error } = log('CatalogueArticleDialog.vue');
const vuex = createNamespacedHelpers('catalogue');

export default {

  name: 'CatalogueArticleDialog',

  props: {
    article: Object,
  },

  // models: [Article, ArticlePicture],

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
    ...vuex.mapGetters({ images: g.GALLERY_PICTURES }),
  },

  methods: {

    ...vuex.mapActions({ addPicture: a.ADD_GALLERY_PICTURE }),

    closeDialog() {
      this.visible = false;
      this.$emit('closed');
    },

    async onUpload(articlePicture) {

      debug('onUpload', articlePicture);

      const { id: articleId } = this.article;
      const { id: pictureId } = articlePicture;

      this.busy = true;

      try {

        await ArticlePictureArticle.create({
          articleId,
          pictureId,
        });

        this.$set(this.article, 'avatarPictureId', pictureId);
        await Article.safeSave(this.article, true);

        this.addPicture(articlePicture);

      } catch (e) {
        error(e);
      }

      this.busy = false;

    },

  },

  created() {
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

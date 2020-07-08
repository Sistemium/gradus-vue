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
  catalogue-picture-gallery(
  :has-authoring="hasAuthoring"
  v-loading="busy"
  element-loading-text="Обработка изображения ..."
  @image-click="closeDialog"
  :model="this.pictureModel"
  :new-image-properties="newImageProperties"
  @uploaded="onUpload"
  )

</template>
<script>

import pick from 'lodash/pick';

import { createNamespacedHelpers } from 'vuex';
import * as a from '@/vuex/catalogue/actions';

import log from 'sistemium-telegram/services/log';
import ManagedComponent from '@/lib/ManagedComponent';
import catalogueAuth from '@/components/catalogue/catalogueAuth';

import CataloguePictureGallery from './CataloguePictureGallery';

const { debug, error } = log('CatalogueArticleDialog');
const vuex = createNamespacedHelpers('catalogue');

export default {

  name: 'CatalogueArticleDialog',

  props: {
    article: Object,
    pictureModel: Object,
  },

  // models: [Article, ArticlePicture],

  data() {
    return {
      busy: false,
      image: undefined,
      visible: true,
    };
  },

  computed: {
    newImageProperties() {
      return pick(this.article, ['name']);
    },
  },

  methods: {

    ...vuex.mapActions({
      addPicture: a.ADD_GALLERY_PICTURE,
      setAsAvatar: a.SET_PICTURE_AS_AVATAR,
    }),

    closeDialog() {
      this.visible = false;
      this.$emit('closed');
    },

    async onUpload(articlePicture, fileName) {

      const { id: articleId, avatarPictureId } = this.article;

      debug('onUpload', articlePicture, articleId, fileName);

      this.busy = true;

      try {

        await this.addPicture({ picture: articlePicture, articleId });

        if (!avatarPictureId) {
          await this.setAsAvatar(articlePicture);
        }

      } catch (e) {
        error(e);
      }

      this.busy = false;

    },

  },

  created() {
  },

  components: {
    CataloguePictureGallery,
  },

  mixins: [ManagedComponent, catalogueAuth],

};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

</style>

<template lang="pug">

.picture-gallery(
v-loading="busy"
element-loading-text="Загрузка изображения ..."
)
  el-carousel(
  ref="carousel"
  v-if="images.length"
  trigger="click"
  height="500px"
  :autoplay="false"
  indicator-position="outside"
  type="card"
  :initial-index="carouselItem"
  @change="onItemChange"
  )
    el-carousel-item(
    v-for="(image, idx) in images" :key="image.id"
    :name="image.id"
    :label="`Фото №${idx+1}`"
    )
      .gallery-image(@click.prevent="$emit('image-click')")

        img(:src="image.largeSrc")

  .empty(v-else @click.prevent="$emit('image-click')")
    img(src="/images/placeholder.png")

  .buttons

    el-button.make-avatar(
    v-if="images.length > 1"
    @click="setAvatarClick"
    :disabled="isAvatar"
    ) {{ buttonText }}

    take-photo-button(
    @done="onUpload"
    @error="unUploadError"
    @imageuploading="busy = true"
    :entity-name="model.name"
    )

    el-button.remove(
    v-if="images.length"
    @click="removeClick"
    :disabled="images.length > 1 && isAvatar"
    ) {{ 'Удалить' }}


</template>
<script>

import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import { createNamespacedHelpers } from 'vuex';
import * as getters from '@/vuex/catalogue/getters';
import * as a from '@/vuex/catalogue/actions';

import TakePhotoButton from '@/components/TakePhotoButton.vue';
import log from 'sistemium-telegram/services/log';

const name = 'PictureGallery';
const { debug, error } = log(name);
const { mapGetters, mapActions } = createNamespacedHelpers('catalogue');

export default {

  name,

  /**
   * @property {Model} model
   * @property {String} image.largeSrc
   */

  props: {
    images: Array,
    model: {
      type: Object,
      required: true,
    },
    newImageProperties: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      busy: false,
      newImage: null,
      carouselItem: 0,
    };
  },

  computed: {
    ...mapGetters({
      activeId: getters.ACTIVE_GALLERY_PICTURE,
      avatarId: getters.AVATAR_PICTURE,
    }),
    isAvatar() {
      return this.currentImage && this.currentImage.id === this.avatarId;
    },
    buttonText() {
      return this.isAvatar ? '✅ Основное фото' : 'Сделать основным';
    },
    currentImage() {
      return this.images[this.carouselItem];
    },
  },

  components: {
    TakePhotoButton,
  },

  watch: {
    activeId(id) {
      this.$nextTick(() => this.$refs.carousel.setActiveItem(id));
    },
  },

  methods: {

    ...mapActions({
      setActive: a.SET_PICTURE_AS_AVATAR,
      removeArticlePicture: a.REMOVE_GALLERY_PICTURE,
    }),

    setAvatarClick() {
      this.setActive(this.currentImage);
    },

    async removeClick() {
      await this.removeArticlePicture(this.currentImage);
    },

    src(image) {
      return image ? image.largeSrc : null;
    },

    onItemChange(carouselItem) {
      this.carouselItem = carouselItem;
    },

    unUploadError(err) {
      this.busy = false;
      const { message = JSON.stringify(err) } = err;
      debug('unUploadError', message);
      this.$message({
        message,
        type: 'warning',
        showClose: true,
      });
    },

    async onUpload(picturesInfo) {

      const { model } = this;
      const { src } = find(picturesInfo, { name: 'original' });
      const { src: thumbnailSrc } = find(picturesInfo, { name: 'thumbnail' });

      debug('onUpload', src, this.busy);

      try {
        const picture = await model.create({
          src,
          thumbnailSrc,
          picturesInfo,
          ...this.newImageProperties,
        });
        this.$emit('uploaded', picture);
      } catch (e) {
        error('onUpload', e.message);
      }

      this.busy = false;

    },

  },

  created() {
    this.carouselItem = findIndex(this.images, ({ id }) => id === this.avatarId);
  },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.picture-gallery {

  text-align: center;
  height: 100%;

  /*display: flex;*/
  flex-direction: column;
  align-items: center;

  .gallery-image {
    justify-content: center;
    display: flex;
    height: 100%;
  }

  .empty {

  }

  img {
    cursor: zoom-out;
    object-fit: contain;
  }

  .buttons {
    margin-top: $margin;
    display: flex;
    justify-content: space-around;
  }

  .take-photo-button {
  }

}

</style>

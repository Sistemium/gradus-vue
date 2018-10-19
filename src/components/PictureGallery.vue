<template lang="pug">

.picture-gallery(
v-loading="busy"
element-loading-text="Загрузка изображения ..."
)
  .gallery-image(@click.prevent="$emit('image-click')")

    img(
    v-if="src"
    :src="src"
    )

    img(
    v-else
    src="/images/placeholder.png"
    )

  take-photo-button(
  @done="onUpload"
  @error="unUploadError"
  @imageuploading="busy = true"
  :entity-name="model.name"
  )

</template>
<script>

import find from 'lodash/find';

import TakePhotoButton from '@/components/TakePhotoButton.vue';
import log from 'sistemium-telegram/services/log';

const name = 'PictureGallery';
const { debug, error } = log(name);

export default {

  name,

  /**
   * @property {Model} model
   * @property {String} image.largeSrc
   */

  props: {
    image: Object,
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
    };
  },

  computed: {
    src() {
      const { image } = this;
      return image ? image.largeSrc : null;
    },
  },

  components: {
    TakePhotoButton,
  },

  methods: {

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

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.picture-gallery {

  text-align: center;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  .gallery-image {
    flex: 1;
    min-height: 0;
  }

  img {
    cursor: zoom-out;
    object-fit: contain;
    max-height: 100%;
  }

  .take-photo-button {
    margin-top: $margin-top * 2;
    display: inline-block;
  }

}

</style>

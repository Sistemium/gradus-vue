<template lang="pug">

.picture-gallery
  .gallery-image(@click.prevent="$emit('image-click')")

    img(
    v-if="src"
    :src="src"
    )

    img(
    v-else
    src="../assets/placeholder.png"
    )

  take-photo-button(
  @done="onUpload"
  @error="unUploadError"
  entity-name="ArticlePicture"
  )

</template>
<script>

import TakePhotoButton from '@/components/TakePhotoButton.vue';
import log from 'sistemium-telegram/services/log';

const name = 'PictureGallery';
const { debug } = log(name);

export default {

  name,

  props: {
    image: Object,
  },

  data() {
    return {
      newImage: null,
    };
  },

  computed: {
    src() {
      const { image: { largeSrc } = {} } = this;
      return largeSrc;
    },
  },

  components: {
    TakePhotoButton,
  },

  methods: {

    unUploadError(err) {
      const { message = JSON.stringify(err) } = err;
      debug('unUploadError', message);
      this.$message({
        message,
        type: 'warning',
        showClose: true,
      });
    },

    onUpload(image) {
      debug('onUpload', JSON.stringify(image));
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

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

</template>
<script>

export default {

  name: 'PictureGallery',

  props: {
    image: Object,
  },

  computed: {
    src() {
      const { image: { largeSrc } = {} } = this;
      return largeSrc;
    },
  },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.picture-gallery {

  text-align: center;
  height: 100%;

  .gallery-image {
    height: 100%;
  }

  img {
    cursor: zoom-out;
    object-fit: contain;
    max-height: 100%;
  }

}

</style>

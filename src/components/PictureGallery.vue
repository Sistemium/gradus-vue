<template lang="pug">

.picture-gallery

  el-dialog(
  :title="title"
  :fullscreen="true"
  :show-close="true"
  center
  )
    img(:src="src")

</template>
<script>

export default {

  name: 'PictureGallery',

  props: {
    title: String,
    image: Object,
  },

  computed: {
    src() {
      const { largeSrc } = this.image;
      return largeSrc;
    },
  },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

img {
  max-height: 500px;
  max-width: 500px;
}

</style>

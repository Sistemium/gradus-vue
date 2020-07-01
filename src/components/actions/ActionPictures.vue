<template lang="pug">

.action-pictures
  .picture(
    v-for="picture in selectedPictures" :key="picture.id"
  )
    .img-wrapper
      img(:src="src(picture)" :class="size")
    slot(name="etc" v-bind:picture="picture")

</template>
<script>

import { getManyArticlePictures } from '@/services/catalogue';

const NAME = 'ActionPictures';

export default {
  name: NAME,
  props: {
    articlePictureIds: Array,
    size: {
      type: String,
      default: 'thumbnail',
    },
  },
  computed: {
    selectedPictures() {
      return getManyArticlePictures(this.articlePictureIds);
    },
  },
  methods: {
    src(picture) {
      return picture[`${this.size}Src`];
    },
  },
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.action-pictures {
  display: flex;

  img.thumbnail {
    max-height: 120px;
  }

  img.small {
    max-height: 270px;
  }

  .img-wrapper {
    width: auto;
    padding: 0 $padding;
  }

  .status {
    right: -5px;
  }
}

.picture {
  position: relative;
}

</style>

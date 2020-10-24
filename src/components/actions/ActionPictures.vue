<template lang="pug">

.action-pictures
  .picture(
    v-for="picture in pictures" :key="picture.id"
  )
    .img-wrapper
      img(
        v-if="picture.src"
        :src="src(picture)"
        :class="size"
      )
      i.el-icon-loading(v-else)
    slot(name="etc" v-bind:picture="picture")

</template>
<script>

// import { getManyArticlePictures } from '@/services/catalogue';

const NAME = 'ActionPictures';

export default {
  name: NAME,
  props: {
    layout: Object,
    // articlePictureIds: Array,
    size: {
      type: String,
      default: 'thumbnail',
    },
  },
  computed: {
    pictures() {
      return this.layout && this.layout.pictures;
    },
  },
  methods: {
    src(picture) {
      const res = picture[`${this.size}Src`];
      return res || picture.src;
    },
  },
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.action-pictures {

  display: flex;
  align-items: flex-end;

  img.thumbnail {
    max-height: 170px;
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

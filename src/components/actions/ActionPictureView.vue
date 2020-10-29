<template lang="pug">

.action-picture-view
  .image(:style="imageStyle")
    img(
      v-if="picture.src"
      :src="src(picture)"
      :class="size"
    )
  .label {{ picture.label }}

</template>
<script>

import ActionPictureForm from '@/components/actions/ActionPictureForm.vue';

const NAME = 'ActionPictureView';

export default {
  name: NAME,
  props: {
    size: {
      type: String,
      default: 'thumbnail',
    },
  },
  mixins: [ActionPictureForm],
  computed: {
    imageStyle() {
      const { height = 100 } = this.picture;
      return {
        // 'max-height': `${height}%`,
        transform: `scale(${height / 100})`,
      };
    },
  },
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.action-picture-view {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.image {
  transform-origin: bottom;
}

img {

  object-fit: contain;

  &.thumbnail {
    max-height: 170px;
  }

  &.small {
    max-height: 270px;
  }

}

.label {
  height: $padding;
  text-align: center;
  //font-weight: bold;
  padding: $margin-right;
  white-space: nowrap;
}

</style>

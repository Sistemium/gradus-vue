<template lang="pug">

.action-pictures(:style="style")
  .comment-text(v-if="layout.commentText") {{ layout.commentText }}
  .pictures
    action-picture-view.picture(
      v-for="picture in pictures" :key="picture.id"
      :picture="picture"
    )

</template>
<script>

import ActionPictureView from '@/components/actions/ActionPictureView.vue';

const NAME = 'ActionPictures';

export default {

  name: NAME,
  components: { ActionPictureView },

  props: {
    layout: Object,
    // articlePictureIds: Array,
    size: {
      type: String,
      default: 'thumbnail',
    },
  },

  computed: {
    style() {
      const { align = 'center' } = this.layout;
      return {
        'justify-content': align === 'center' ? 'center' : 'flex-end',
        'flex-direction': align === 'flex-start' ? 'row-reverse' : 'row',
      };
    },
    pictures() {
      return this.layout && this.layout.pictures;
    },
  },

};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.action-pictures {
  display: flex;
  align-items: center;
}

.pictures {

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

  > .picture {
    margin: $margin-top;
  }

}

//
//.picture {
//  position: relative;
//}

</style>

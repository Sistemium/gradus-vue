<template lang="pug">

.action-pictures(:style="layoutStyle" :class="cls")
  styled-comment(:text="commentText")
  .pictures
    action-picture-view.picture(
      v-for="picture in pictures" :key="picture.id"
      :picture="picture"
      :size="size"
    )

</template>
<script>

import find from 'lodash/find';
import StyledComment from '@/components/StyledComment.vue';
import ActionPictureView from '@/components/actions/ActionPictureView.vue';

const NAME = 'ActionPictures';

export default {

  name: NAME,
  components: {
    StyledComment,
    ActionPictureView,
  },

  props: {
    layout: {
      type: Object,
      required: true,
    },
    parentCommentText: String,
    size: {
      type: String,
      default: 'thumbnail',
    },
  },

  computed: {
    layoutStyle() {
      const { align = 'center' } = this.layout;
      return {
        'justify-content': align === 'center' ? 'center' : 'flex-end',
        'flex-direction': this.directionStyle,
      };
    },
    hasLabels() {
      return !!find(this.pictures, 'label');
    },
    cls() {
      return this.layout.align && [`layout-${this.layout.align}`, !this.hasLabels && 'no-labels'];
    },
    directionStyle() {
      switch (this.layout.align) {
        case 'center':
          return 'column';
        case 'flex-start':
          return 'row-reverse';
        default:
          return 'row';
      }
    },
    pictures() {
      return this.layout && this.layout.pictures;
    },
    commentText() {
      return this.layout.commentText || this.parentCommentText;
    },
  },

};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.action-pictures {
  display: flex;
  align-items: center;
  &.no-labels ::v-deep {
    .label {
      display: none;
    }
  }
}

.styled-comment {
  margin: 0 $margin-top;
  max-width: 400px;
}

.action-pictures.layout-center {
  .styled-comment {
    margin: 0 auto;
    max-width: none;
  }
}

.pictures {

  display: flex;
  align-items: flex-end;

  .img-wrapper {
    width: auto;
    padding: 0 $padding;
  }

  > .picture {
    margin: $margin-top;
  }

}

</style>

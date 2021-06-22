<template lang="pug">

.comments-view(v-if="comments && comments.length")
  .comment(v-for="(comment, idx) in comments" :key="idx")
    i.el-icon-info
    styled-comment(:text="comment.text")

</template>
<script>

import StyledComment from '@/components/StyledComment.vue';

export default {
  name: 'CommentsView',
  components: { StyledComment },
  props: {
    comments: Array,
  },
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.comment {

  display: flex;

  i {
    margin-right: $margin-right;
    color: $orange;
  }

  & + .comment {
    margin-top: $margin-top;
  }

}

</style>

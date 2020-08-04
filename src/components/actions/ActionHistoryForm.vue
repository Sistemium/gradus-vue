<template lang="pug">

el-form.action-history-form(
  :model="history"
  :rules="rules"
  ref="form"
  size="mini"
  @validate="onValidate"
)

  el-form-item.comment(label="Описание изменений" prop="commentText" ref="comment")
    el-input(
      v-model="history.commentText"
      placeholder="Опишите суть корректировки"
      type="textarea"
      autosize
    )

  el-form-item.comment-is-not-necessary(v-if="showNotNecessary()")
    el-checkbox(v-model="isNotNecessaryComment") Описание не требуется, изменения незначительны

</template>
<script>

const NAME = 'ActionHistoryForm';

export default {
  name: NAME,
  props: {
    history: {
      type: Object,
      required: true,
    },
  },
  methods: {
    showNotNecessary() {
      const { comment } = this.$refs;
      return this.isNotNecessaryComment || (comment && comment.validateState === 'error');
    },
    onValidate() {
      this.$forceUpdate();
    },
  },
  computed: {
    rules() {
      return {
        commentText: [
          {
            required: !this.isNotNecessaryComment,
            message: 'Описание нужно обязательно указать',
            trigger: 'change',
          },
        ],
      };
    },
  },
  data() {
    return {
      isNotNecessaryComment: false,
    };
  },
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

</style>

<template lang="pug">

el-form.action-history-form(
  :model="history"
  :rules="rules"
  ref="form"
  size="mini"
)

  el-form-item.comment(label="Описание изменений" prop="commentText")
    el-input(
      v-model="history.commentText"
      placeholder="Опишите суть корректировки"
      type="textarea"
      autosize
    )

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
  data() {
    return {
      rules: {
        commentText: [
          {
            required: true,
            message: 'Описание нужно обязательно указать',
            trigger: 'change',
          },
        ],
      },
    };
  },
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

</style>

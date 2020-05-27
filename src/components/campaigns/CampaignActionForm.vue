<template lang="pug">

el-form.campaign-action-form(
  :rules="rules"
  :model="model"
  ref="form"
  size="small"
)
  el-form-item.name(label="Название" prop="name")
    el-input(v-model="model.name")

  el-form-item.comment(prop="commentText")
    el-input(v-model="model.commentText" type="textarea" placeholder="Комментарий" autosize)

  action-discount-form(:discount="model")

  action-required-form(:required="model.required")

  .options
    h3.title Варианты:
    .option(v-for="(option, idx) in model.options")
      .number
        .idx {{ idx + 1 }}
        .buttons
          button-edit
      .title
        el-input(v-model="option.name" size="small" placeholder="Название")
        el-input(v-model="option.commentText" type="textarea" placeholder="Комментарий" autosize)
      .ranges(v-if="option.ranges")
        .name(v-for="range in option.ranges") {{ range.name }}

</template>
<script>

import ActionRequiredForm from '@/components/actions/ActionRequiredForm.vue';
import ActionDiscountForm from '@/components/actions/ActionDiscountForm.vue';

const NAME = 'CampaignActionForm';

const rules = {
  name: [
    {
      required: true,
      message: 'Название нужно указать',
      trigger: 'change',
    },
  ],
};

export default {
  components: {
    ActionDiscountForm,
    ActionRequiredForm,
  },
  data() {
    return { rules };
  },
  props: {
    model: Object,
  },
  name: NAME,
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.option {
  display: grid;
  grid-template-columns: 35px auto;
  border: $list-cell-borders;
  border-radius: $border-radius;
  padding: $padding;
  background: $gray-background;

  .title {
    grid-column: 2;
  }

  .ranges {
    grid-column: 2;
  }

  .number {
    font-size: small;
    text-align: center;
    padding: $padding $padding 0 0;
  }

  & + .option {
    margin-top: $padding;
  }
}

</style>

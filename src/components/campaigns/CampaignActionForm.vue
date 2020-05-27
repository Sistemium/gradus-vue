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

  .ranges(v-if="model.ranges")
    .header
      h3.title Ассортимент
      .buttons
        el-button.button-add(
          @click="addRangeClick"
          size="mini"
          icon="el-icon-circle-plus"
          circle
        )
    .range(v-for="(range, idx) in model.ranges" :key="idx")
      el-input(
        v-model="range.name"
        size="mini"
        :clearable="true"
        @clear="clearRangeClick(idx)"
      )

  .options(v-if="model.options")
    h3.title Варианты:
    .option(v-for="(option, idx) in model.options" :key="idx")
      .number
        .idx {{ idx + 1 }}
      action-option-info(:action="option")
      .buttons
        button-edit(@click="$emit('editOption', option, idx)")

</template>
<script>

import ActionRequiredForm from '@/components/actions/ActionRequiredForm.vue';
import ActionDiscountForm from '@/components/actions/ActionDiscountForm.vue';
import ActionOptionInfo from '@/components/actions/ActionOptionInfo.vue';

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
  methods: {
    addRangeClick() {
      this.model.ranges.push({ name: '' });
    },
    clearRangeClick(idx) {
      this.model.ranges.splice(idx, 1);
    },
  },
  components: {
    ActionOptionInfo,
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
  grid-template-columns: 35px auto 35px;
  border: $list-cell-borders;
  border-radius: $border-radius;
  padding: $padding;
  background: $gray-background;

  .title {
    grid-column: 2;
  }

  .buttons {
    grid-column: 3;
    text-align: right;
  }

  .number {
    text-align: center;
    padding: $padding $padding $padding 0;
    color: $primary-color;
    font-weight: bold;
  }

  & + .option {
    margin-top: $padding;
  }
}

.header {
  display: flex;
  align-items: center;

  .title {
    flex: 1;
    margin: 0;
  }
}

.button-add {
  color: $primary-color;
}

.list-group-item > .el-input {
  margin: 0;
}

</style>

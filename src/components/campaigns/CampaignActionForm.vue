<template lang="pug">

el-form.campaign-action-form(
  :rules="rules"
  :model="model"
  ref="form"
  size="mini"
)
  el-form-item.name(label="Название" prop="name")
    el-input(v-model="model.name" :placeholder="namePlaceholder")

  el-form-item.comment(prop="commentText")
    el-input(
      v-model="model.commentText"
      type="textarea"
      placeholder="комментарий"
      autosize
    )

  el-form-item.territory(v-if="model.options")
    el-input(
      v-model="model.territory" placeholder="ограничение по территории" :clearable="true"
    )
      template(slot="prepend")
        i.el-icon-location

  .switches(v-if="model.options")
    el-switch(v-model="model.oneTime" inactive-text="Единовременная")
    el-switch(v-model="model.repeatable" inactive-text="Многократная")
    el-switch(v-model="model.needPhoto" inactive-text="Фото-отчет")

  action-ranges-form(:model="model")

  el-collapse(v-model="activeZones")
    el-collapse-item(title="Скидки" name="discounts")
      action-discount-form(:discount="model")
    el-collapse-item(title="Объем закупки" name="required")
      action-required-form(:required="model.required")

  action-options-form(:model="model" @editOption="editOption" @addOption="addOption")

</template>
<script>

import ActionRequiredForm from '@/components/actions/ActionRequiredForm.vue';
import ActionDiscountForm from '@/components/actions/ActionDiscountForm.vue';
import ActionOptionsForm from '@/components/actions/ActionOptionsForm.vue';
import ActionRangesForm from '@/components/actions/ActionRangesForm.vue';

const NAME = 'CampaignActionForm';

export default {
  data() {
    return { activeZones: [] };
  },
  methods: {
    validate(cb) {
      this.$refs.form.validate(cb);
    },
    addOption() {
      this.$emit('addOption');
    },
    editOption(option, idx) {
      this.$emit('editOption', option, idx);
    },
  },
  computed: {
    namePlaceholder() {
      const { name: [{ required }] = [{}] } = this.rules || {};
      return required ? '' : 'необязательный заголовок';
    },
  },
  components: {
    ActionRangesForm,
    ActionOptionsForm,
    ActionDiscountForm,
    ActionRequiredForm,
  },
  props: {
    model: Object,
    rules: {
      type: Object,
      default: () => {
      },
    },
  },
  name: NAME,
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.action-options-form {
  margin-top: 7px;
}

.el-collapse {
  & /deep/ h3.title {
    display: none;
  }
  & /deep/ .el-collapse-item__content {
    padding-bottom: 0;
  }
}

.switches {
  margin-bottom: 18px;

  > * + * {
    margin-left: $margin-right;
  }

  /deep/ .el-switch__label {
    font-weight: normal;
    color: $gray;
  }
}

.campaign-action-form /deep/ h3 {
  font-weight: 500;
  font-size: 13px;
}

</style>

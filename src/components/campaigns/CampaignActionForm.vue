<template lang="pug">

el-form.campaign-action-form(
  :rules="rules"
  :model="action"
  ref="form"
  size="mini"
)
  el-form-item.name(label="Название" prop="name")
    el-input(v-model="action.name" :placeholder="namePlaceholder")

  el-form-item.comment(prop="commentText")
    el-input(
      v-model="action.commentText"
      type="textarea"
      placeholder="комментарий"
      autosize
    )

  el-form-item.territory(v-if="action.options")
    el-input(
      v-model="action.territory" placeholder="ограничение по территории" :clearable="true"
    )
      template(slot="prepend")
        i.el-icon-location

  .switches(v-if="action.options")
    el-switch(v-model="action.oneTime" inactive-text="Единовременная")
    el-switch(v-model="action.repeatable" inactive-text="Многократная")
    el-switch(v-model="action.needPhoto" inactive-text="Фото-отчет")

  action-options-form(:model="action" @editOption="editOption" @addOption="addOption")

  action-ranges-form(:model="action")

  el-collapse(v-model="activeZones")
    el-collapse-item(title="Объем закупки" name="required")
      action-required-form(:required="action.required")
    el-collapse-item(title="Скидки" name="discounts")
      action-discount-form(:discount="action")

</template>
<script>

import filter from 'lodash/filter';
import ActionRequiredForm from '@/components/actions/ActionRequiredForm.vue';
import ActionDiscountForm from '@/components/actions/ActionDiscountForm.vue';
import ActionOptionsForm from '@/components/actions/ActionOptionsForm.vue';
import ActionRangesForm from '@/components/actions/ActionRangesForm.vue';
import actionBase from '@/components/actions/actionBase';

const NAME = 'CampaignActionForm';

export default {
  data() {
    return {
      activeZones: [],
    };
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
    initZones() {
      const isRoot = !!this.action.options;
      return filter([
        (!isRoot || this.hasRequired) && 'required',
        (!isRoot || this.discount) && 'discounts',
      ]);
    },
  },
  computed: {
    namePlaceholder() {
      const { name: [{ required }] = [{}] } = this.rules || {};
      return required ? '' : 'необязательный заголовок';
    },
  },
  created() {
    this.$watch('action.id', () => {
      this.activeZones = this.initZones();
    }, { immediate: true });
  },
  components: {
    ActionRangesForm,
    ActionOptionsForm,
    ActionDiscountForm,
    ActionRequiredForm,
  },
  props: {
    // action: Object,
    rules: {
      type: Object,
      default: () => {
      },
    },
  },
  mixins: [actionBase],
  name: NAME,
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.action-ranges-form {
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

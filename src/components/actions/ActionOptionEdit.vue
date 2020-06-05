<template lang="pug">

el-drawer.campaign-action-edit(
  :title="title"
  :before-close="handleClose"
  :visible.sync="drawerOpen"
  :append-to-body="true"
  :destroy-on-close="true"
  :style="top"
  ref="drawer"
  size="450px"
  @closed="$emit('closed')"
)
  section.content
    campaign-action-form.form(
      :action="model"
      :may-have-options="!parentOption"
      ref="form"
      @editOption="onEditOption"
      @addOption="onAddOption"
    )

  form-buttons(
    :loading="loading"
    :changed="changed"
    @deleteClick="deleteClick"
    @cancelClick="cancelClick"
    @saveClick="saveClick"
  )

  action-option-edit(
    v-if="editOption"
    :option="editOption.option"
    :title="editOption.title"
    @save="onOptionSave"
    @delete="onOptionDelete"
    @closed="editOption = null"
    :parent-option="option"
  )

</template>
<script>

import DrawerEditor from '@/lib/DrawerEditor';
import CampaignActionForm from '@/components/campaigns/CampaignActionForm.vue';
import FormButtons from '@/lib/FormButtons.vue';
import remove from 'lodash/remove';

const NAME = 'ActionOptionEdit';

export default {
  name: NAME,
  data() {
    return {
      editOption: null,
    };
  },
  computed: {
    modelOrigin() {
      return this.option;
    },
    top() {
      return this.parentOption ? { top: '50px' } : {};
    },
  },
  methods: {
    onAddOption() {
      const { options: { length: idx } = [] } = this.model;
      this.editOption = {
        idx,
        option: { ranges: [] },
        title: `${this.title} / дополнение №${idx + 1}`,
      };
    },
    onEditOption(option, idx) {
      this.editOption = {
        idx,
        option,
        title: `${this.title} / дополнение №${idx + 1}`,
      };
    },
    onOptionDelete() {
      const { idx } = this.editOption;
      this.model.options.splice(idx, 1);
    },
    onOptionSave(option) {
      if (!this.editOption) {
        throw new Error('Undefined option onOptionSave');
      }
      const { idx } = this.editOption;
      this.$set(this.model.options, idx, option);
    },
    getModel() {
      return {
        required: { isMultiple: false },
        ranges: [],
        options: [],
        ...this.cloneDeep(this.option),
      };
    },
    deleteClick() {
      this.performOperation(() => {
        this.$emit('delete');
      });
    },
    saveClick() {
      this.performOperation(() => {

        remove(this.model.ranges, ({ name }) => !name);

        const { required } = this.model;

        if (required) {
          const { volume, volumeTo } = required;
          if (volumeTo < volume) {
            throw new Error('"Литров до" должно быть больше чем "Литров"');
          }
          const { cost, costTo } = required;
          if (costTo < cost) {
            throw new Error('"Сумма до" должна быть больше чем "Сумма"');
          }
        }

        this.$emit('save', this.model);

      });
    },
  },
  created() {
    this.model = this.getModel();
  },
  props: {
    title: String,
    option: {
      type: Object,
      required: true,
    },
    parentOption: {
      type: Object,
    },
  },
  components: {
    FormButtons,
    CampaignActionForm,
  },
  mixins: [DrawerEditor],
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.content {
  padding: 0 $margin-right 80px;
}

</style>

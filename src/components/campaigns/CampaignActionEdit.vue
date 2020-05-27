<template lang="pug">

el-drawer.campaign-action-edit(
  :title="modelOrigin.name"
  :before-close="handleClose"
  :visible.sync="drawerOpen"
  :append-to-body="true"
  :destroy-on-close="true"
  ref="drawer"
  size="490px"
)
  section.content(v-if="model")
    campaign-action-form.form(:model="model" @editOption="onEditOption")
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
    @closed="editOption = null"
  )

</template>
<script>

import DrawerEditor from '@/lib/DrawerEditor';
import Action from '@/models/Action';
import CampaignActionForm from '@/components/campaigns/CampaignActionForm.vue';
import ActionOptionEdit from '@/components/actions/ActionOptionEdit.vue';
import FormButtons from '@/lib/FormButtons.vue';
import matchesDeep from '@/lib/matchesDeep';
import cloneDeep from 'lodash/cloneDeep';

const NAME = 'CampaignActionEdit';

export default {
  computed: {
    modelOrigin() {
      return { required: {}, ...Action.get(this.actionId) };
    },
    changed() {
      return !matchesDeep(this.model, this.modelOrigin);
    },
  },
  methods: {
    onEditOption(option, idx) {
      this.editOption = {
        idx,
        option,
        title: `${this.modelOrigin.name} / вариант №${idx + 1}`,
      };
    },
    modelInstance(actionId) {
      const record = actionId ? this.modelOrigin : {};
      return Action.mapper.createInstance({ required: {}, ...cloneDeep(record) });
    },
    saveClick() {
      this.performOperation(() => Action.create(this.model));
    },
    onOptionSave(option) {
      if (!this.editOption) {
        throw new Error('Undefined option onOptionSave');
      }
      const { idx } = this.editOption;
      this.$set(this.model.options, idx, option);
    },
  },
  props: {
    actionId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      model: null,
      editOption: null,
    };
  },
  created() {
    this.$watch('actionId', actionId => {
      this.model = this.modelInstance(actionId);
    }, { immediate: true });
  },
  components: {
    FormButtons,
    CampaignActionForm,
    ActionOptionEdit,
  },
  mixins: [DrawerEditor],
  name: NAME,
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.content {
  padding: 0 $margin-right 80px;
}

.campaign-action-edit /deep/ .el-drawer__body {
  overflow-y: scroll;
}

</style>

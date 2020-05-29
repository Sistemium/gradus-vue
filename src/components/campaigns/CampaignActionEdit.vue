<template lang="pug">

el-drawer.campaign-action-edit(
  :title="title"
  :before-close="handleClose"
  :visible.sync="drawerOpen"
  :append-to-body="true"
  :destroy-on-close="true"
  ref="drawer"
  size="490px"
)
  section.content(v-if="model")
    campaign-action-form.form(
      :model="model"
      :rules="campaignActionRules"
      @editOption="onEditOption"
      @addOption="onAddOption"
      ref="form"
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
    title() {
      return this.actionId ? this.modelOrigin.name : 'Новая механика акции';
    },
    modelOrigin() {
      return {
        options: [],
        required: {},
        ranges: [],
        ...(this.actionId ? Action.get(this.actionId)
          .toJSON() : {
          campaignId: this.campaignId,
          oneTime: true,
          repeatable: true,
        }),
      };
    },
    changed() {
      return !matchesDeep(this.model, this.modelOrigin);
    },
    campaignId() {
      return this.$route.params.campaignId;
    },
  },
  methods: {
    onAddOption() {
      const idx = this.model.options.length;
      this.editOption = {
        idx,
        option: { ranges: [] },
        title: `${this.title} / вариант №${idx + 1}`,
      };
    },
    onEditOption(option, idx) {
      this.editOption = {
        idx,
        option,
        title: `${this.modelOrigin.name} / вариант №${idx + 1}`,
      };
    },
    modelInstance() {
      return Action.mapper.createInstance({
        required: {}, ...cloneDeep(this.modelOrigin),
      });
    },
    saveClick() {
      this.performOperation(async () => new Promise((resolve, reject) => {
        if (!this.model.options.length) {
          reject(new Error('Нужно добавить хотя бы один вариант'));
          return;
        }
        this.$refs.form.validate(isValid => {
          if (!isValid) {
            reject(new Error('Форма не заполнена корректно'));
          }
          Action.create(this.model)
            .then(resolve, reject);
        });
      }));
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
  },
  props: {
    actionId: {
      type: String,
    },
  },
  data() {
    return {
      model: null,
      editOption: null,
      campaignActionRules: {
        name: [
          {
            required: true,
            message: 'Название нужно указать',
            trigger: 'change',
          },
        ],
      },
    };
  },
  created() {
    this.$watch('actionId', () => {
      this.model = this.modelInstance();
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

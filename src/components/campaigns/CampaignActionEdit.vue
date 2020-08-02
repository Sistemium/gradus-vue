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
      :action="model"
      :rules="campaignActionRules"
      @editOption="onEditOption"
      @addOption="onAddOption"
      @copyOption="onCopyOption"
      @pasteOption="onPasteOption"
      ref="form"
      :is-root="true"
    )
    .footer
      action-history-form(v-if="logHistory" :history="actionHistoryEntry" ref="historyForm")
      form-buttons(
        v-if="hasAuthoring"
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
    :force-modified="editOption.forceModified"
    @save="onOptionSave"
    @delete="onOptionDelete"
    @closed="editOption = null"
  )

</template>
<script>

import { v4 } from 'uuid';
import { createNamespacedHelpers } from 'vuex';
import DrawerEditor from '@/lib/DrawerEditor';
import Action from '@/models/Action';
import ActionHistory from '@/models/ActionHistory';
import CampaignActionForm from '@/components/campaigns/CampaignActionForm.vue';
import ActionHistoryForm from '@/components/campaigns/ActionHistoryForm.vue';
import ActionOptionEdit from '@/components/actions/ActionOptionEdit.vue';
import FormButtons from '@/lib/FormButtons.vue';
import cloneDeep from 'lodash/cloneDeep';

import optionEditing from '@/components/actions/optionEditing';
import * as g from '@/vuex/campaigns/getters';

const { mapGetters } = createNamespacedHelpers('campaigns');

const NAME = 'CampaignActionEdit';

export default {

  computed: {

    title() {
      return this.actionId ? this.modelOrigin.name : 'Новая механика акции';
    },
    modelOrigin() {

      const { actionCopy } = this;
      const { name, params: { campaignId } } = this.$route;
      const useCopy = actionCopy && name === 'campaignActionPaste' && {
        ...actionCopy,
        campaignId,
      };

      const action = this.actionId ? this.getActionPlain() : (useCopy || this.defaultProps);

      return {
        options: [],
        required: { isMultiple: false },
        ranges: [],
        ...action,
      };
    },
    defaultProps() {
      return {
        campaignId: this.campaignId,
        oneTime: true,
        repeatable: true,
        needPhoto: false,
      };
    },

    campaignId() {
      return this.$route.params.campaignId;
    },

    logHistory() {
      // TODO: check campaign processing
      return this.changed;
    },

    ...mapGetters({
      actionCopy: g.ACTION_COPY,
    }),

  },
  methods: {
    getActionPlain() {
      const action = Action.get(this.actionId);
      return action && action.toJSON();
    },
    onPasteOption() {
      const { optionCopy: option } = this;
      if (!option) {
        this.$message('Нет скопированного варианта');
        return;
      }
      this.onAddOption(option, true);
    },
    onAddOption(option = { ranges: [] }, forceModified = false) {
      this.onEditOption(option, this.model.options.length, forceModified);
    },
    onEditOption(option, idx, forceModified = false) {
      this.editOption = {
        idx,
        option,
        title: `${this.title} / вариант №${idx + 1}`,
        forceModified,
      };
    },
    modelInstance() {
      return Action.mapper.createInstance({
        required: { isMultiple: false },
        ...cloneDeep(this.modelOrigin),
      });
    },
    deleteClick() {
      this.performOperation(async () => {
        if (!this.model.id) {
          return;
        }
        await Action.destroy(this.model);
      });
    },
    saveClick() {
      this.performOperation(async () => {
        if (!this.model.options.length) {
          throw new Error('Нужно добавить хотя бы один вариант');
        }
        if (!this.model.discountHeaders().length) {
          throw new Error('Нужно добавить хотя бы одну скидку');
        }
        await this.validate();
        if (this.logHistory) {
          await this.validate(this.$refs.historyForm.$refs.form);
        }
        await this.saveAction();
      });
    },

    async saveAction() {
      const { logHistory } = this;
      if (logHistory) {
        await ActionHistory.create({
          ...this.actionHistoryEntry,
          actionId: this.actionId,
          archived: this.modelOrigin,
        });
      }
      Action.create(this.model);
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
      this.$set(this.model.options, idx, { id: v4(), ...option });
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
      actionHistoryEntry: {
        commentText: '',
      },
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
    ActionHistoryForm,
    FormButtons,
    CampaignActionForm,
    ActionOptionEdit,
  },
  mixins: [DrawerEditor, optionEditing],
  name: NAME,
};

</script>
<style scoped lang="scss">

@import "../../styles/mixins";

.content {
  padding: 0 $margin-right 200px;
}

.campaign-action-edit /deep/ .el-drawer__body {
  overflow-y: scroll;
}

.footer {
  @extend %bottom-bar;
}

</style>

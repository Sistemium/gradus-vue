<template lang="pug">

el-dialog.campaign-input(
  top="4vh"
  :title="title"
  :before-close="closeDialog"
  :visible.sync="visible"
  :append-to-body="true"
)

  el-form(
    :model="newCampaign"
    ref="newCampaign"
    :rules="rules"
    size="mini"
  )
    el-form-item(label="Группа" prop="groupCode")
      campaign-group-select(v-model="newCampaign.groupCode")

    el-form-item(label="Приоритет" prop="priorityId")
      campaign-priority-select(v-model="newCampaign.priorityId")

    el-form-item(label="Название" prop="name")
      el-input(v-model="newCampaign.name")

    .period

      el-form-item(label="Дата начала" prop="dateB")
        el-date-picker(
          v-model="newCampaign.dateB"
          :picker-options = "{ disabledDate: disableMinDate }"
          format="yyyy/MM/dd"
          value-format="yyyy-MM-dd"
        )

      el-form-item(label="Дата окончания" prop="dateE")
        el-date-picker(
          v-model="newCampaign.dateE"
          :picker-options= "{ disabledDate: disableMaxDate }"
          format="yyyy/MM/dd"
          value-format="yyyy-MM-dd"
        )

    el-form-item(label="Комментарий" prop="commentText")
      el-input(v-model="newCampaign.commentText" type="textarea" :autosize="{ minRows: 2 }")

    .switches
      el-switch(v-model="newCampaign.oneTime" inactive-text="Единовременная")
      el-switch(v-model="newCampaign.repeatable" inactive-text="Многократная")
      el-switch(v-model="newCampaign.needPhoto" inactive-text="Фото-отчет")

    el-form-item.territory
      el-input(
        v-model="newCampaign.territory"
        placeholder="ограничение по территории"
        :clearable="true"
      )
        template(slot="prepend")
          i.el-icon-location

    .other(v-if="actions || pictures")
      el-form-item
        .actions(v-if="actions") Подчиненных акций: {{ actions.length }}
        .actions(v-if="pictures") Изображений: {{ pictures.length }}

    .buttons
      confirm-button.remove(
        size="small"
        v-if="isEdit()"
        text="Удалить" confirm-text="Точно удалить?"
        @confirm="removeClick"
      )
      .editButtons
        el-button(@click="closeDialog" size="small") Отмена
        el-button(type="primary" @click="submitDialog('newCampaign')" size="small") Готово

</template>

<script>

import CampaignGroupSelect from '@/components/campaigns/CampaignGroupSelect.vue';
import CampaignPrioritySelect from '@/components/campaigns/CampaignPrioritySelect.vue';

export default {

  name: 'CampaignDialog',
  components: {
    CampaignPrioritySelect,
    CampaignGroupSelect,
  },
  props: {
    campaign: Object,
  },

  data() {
    return {
      newCampaign: { ...this.campaign },
      rules: {
        priorityId: [],
        groupCode: [
          {
            required: true,
            message: 'Укажите группу акций',
            trigger: 'blur',
          },
        ],
        name: [
          {
            required: true,
            message: 'Введите название',
            trigger: 'blur',
          },
        ],
        dateB: [
          {
            required: true,
            message: 'Введите дату начала',
            trigger: 'blur',
          },
        ],
        dateE: [
          {
            required: true,
            message: 'Введите дату окончания',
            trigger: 'blur',
          },
        ],
      },

      visible: true,

    };
  },

  methods: {

    closeDialog() {

      this.newCampaign = {};
      this.visible = false;
      this.$emit('closed');

    },

    submitDialog(formName) {

      this.$refs[formName].validate(valid => {

        if (valid) {
          this.$emit('submit', this.newCampaign);
          this.closeDialog();
        }

        return valid;

      });

    },

    disableMinDate(date) {
      return !!(this.newCampaign.dateE && date > new Date(this.newCampaign.dateE));
    },

    disableMaxDate(date) {
      return !!(this.newCampaign.dateB && date < new Date(this.newCampaign.dateB));
    },

    removeClick() {

      this.$emit('remove', this.campaign);
      this.closeDialog();

    },

    isEdit() {
      return this.campaign.id;
    },

    // minVersion() {
    //   return this.campaign.version || 1;
    // },
    //
    // maxVersion() {
    //   return (this.campaign.version || 1) + 1;
    // },

  },

  computed: {

    pictures() {
      const { pictures } = this.newCampaign;
      return pictures && pictures.length && pictures;
    },

    actions() {
      const { actions } = this.newCampaign;
      return actions && actions.length && actions;
    },

    title() {
      return this.isEdit() ? this.campaign.name : 'Новая Акция';
    },

  },

};

</script>

<style scoped lang="scss">

@import "../../styles/switches";

.campaign-input {

  .el-input {
    width: 100%;
  }

  .buttons {

    display: flex;
    justify-content: space-between;
    flex-direction: row;

  }

  .remove {
    margin-right: 0;
  }

  .el-input-number {
    width: 100%;
  }

}

.period {
  display: flex;
  justify-content: space-between;
}

.switches {
  @extend %switches;
}

</style>

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

    el-form-item(label="Название" prop="name")

      el-input(v-model="newCampaign.name")

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

    el-form-item(label="Версия" prop="version" v-if="isEdit()")

      el-input-number(
      v-model="newCampaign.version"
      :min="minVersion()"
      :max="maxVersion()"
      )

    el-form-item(label="Описание" prop="commentText")

      el-input(v-model="newCampaign.commentText" type="textarea" :rows="4")

    el-form-item
      .buttons
        confirm-button.remove(
        v-if="isEdit()"
        text="Удалить" confirm-text="Точно удалить?"
        @confirm="removeClick"
        )
        .editButtons
          el-button(@click="closeDialog") Отмена
          el-button(type="primary" @click="submitDialog('newCampaign')") Готово

</template>

<script>

import CampaignGroupSelect from '@/components/campaigns/CampaignGroupSelect.vue';

export default {

  name: 'CampaignDialog',
  components: { CampaignGroupSelect },
  props: {
    campaign: Object,
  },

  data() {
    return {
      newCampaign: {
        name: '',
        dateB: '',
        dateE: '',
        commentText: '',
      },
      rules: {
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

    async submitDialog(formName) {

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

    minVersion() {
      return this.campaign.version || 1;
    },

    maxVersion() {
      return (this.campaign.version || 1) + 1;
    },

  },

  computed: {

    title() {
      return this.isEdit() ? this.campaign.name : 'Новая Акция';
    },

  },

  created() {

    this.newCampaign = { ...this.campaign };

    if (!this.newCampaign.version) {
      this.newCampaign.version = 1;
    }

  },

};

</script>

<style scoped lang="scss">

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

</style>

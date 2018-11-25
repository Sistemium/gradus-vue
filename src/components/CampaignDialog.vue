<template lang="pug">

el-dialog.campaign-input(
:title="title"
:before-close="closeDialog"
:visible.sync="visible"
)

  el-form(
  :model="newCampaign"
  ref="newCampaign"
  :rules="rules"
  )

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

    el-form-item(label="Описание" prop="commentText")

      el-input(v-model="newCampaign.commentText" type="textarea" :rows="4" resize="none")

    el-form-item
      el-button(@click="closeDialog") Отмена
      el-button(type="primary" @click="submitDialog('newCampaign')") Готово

</template>

<script>

export default {

  name: 'CampaignDialog',

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
        name: [
          {
            required: true, message: 'Введите название', trigger: 'blur',
          },
        ],
        dateB: [
          {
            required: true, message: 'Введите дату начала', trigger: 'blur',
          },
        ],
        dateE: [
          {
            required: true, message: 'Введите дату окончания', trigger: 'blur',
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

  },

  computed: {

    title() {

      if (this.campaign.id) {

        return 'Редактировать';

      }

      return 'Новая Акция';

    },

  },

  created() {

    this.newCampaign = { ...this.campaign };

  },

};

</script>

<style scoped lang="scss">

.campaign-input {

  .el-input {

    width: 100%;

  }

}

</style>

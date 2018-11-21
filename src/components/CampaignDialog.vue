<template lang="pug">

el-dialog.campaign-input(
title="Новая Акция"
:before-close="closeDialog"
:visible.sync="visible"
)

  label Название *

  el-input(v-model="newCampaign.name")

  label Дата начала *

  el-date-picker(
  v-model="newCampaign.dateB"
  :picker-options = "{ disabledDate: disableMinDate }"
  format="yyyy/MM/dd"
  value-format="yyyy-MM-dd"
  )

  label Дата окончания *

  el-date-picker(
  v-model="newCampaign.dateE"
  :picker-options= "{ disabledDate: disableMaxDate }"
  format="yyyy/MM/dd"
  value-format="yyyy-MM-dd"
  )

  label Описание

  el-input(v-model="newCampaign.commentText" type="textarea" :rows="4" resize="none")

  span(slot="footer" class="dialog-footer")
    el-button(@click="closeDialog") Отмена
    el-button(type="primary" @click="submitDialog") Готово

</template>

<script>

import { createNamespacedHelpers } from 'vuex';
import * as actions from '@/vuex/campaigns/actions';

const { mapActions } = createNamespacedHelpers('campaigns');

export default {

  name: 'CampaignDialog',

  data() {
    return {
      newCampaign: {},
      visible: true,
    };
  },

  methods: {

    ...mapActions({
      updateCampaign: actions.UPDATE_CAMPAIGN,
    }),

    closeDialog() {

      this.newCampaign = {};

      this.visible = false;

      this.$emit('closed');

    },

    async submitDialog() {

      this.updateCampaign({
        ...this.newCampaign,
        isActive: true,
      });


      this.closeDialog();

    },

    disableMinDate(date) {

      return !!(this.newCampaign.dateE && date > new Date(this.newCampaign.dateE));

    },

    disableMaxDate(date) {

      return !!(this.newCampaign.dateB && date < new Date(this.newCampaign.dateB));

    },

  },

};

</script>

<style scoped lang="scss">

.campaign-input {

  .el-input {

    padding: 12px 6px;
    display: block;
    width: 100%;

  }

  .el-textarea {

    padding: 12px 6px;
    width: 100%;

  }

  label {

    padding: 6px;

  }

}

</style>

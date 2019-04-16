<template lang="pug">

el-dialog.sales-target-dialog(
:title="title"
:before-close="closeDialog"
:visible.sync="visible"
:append-to-body="true"
width="80%"
)
  .dialog-body(v-loading="busy")

    sales-target-edit(
    ref="form"
    :target="salesTarget"
    )

    .buttons
      el-button(type="primary" @click="submitClick") Готово
      el-button(@click="closeDialog") Отмена

</template>
<script>

import DialogComponent from '@/lib/DialogComponent';
import SalesTarget from '@/models/SalesTarget';

import SalesTargetEdit from './SalesTargetEdit.vue';

export default {

  name: 'SalesTargetDialog',

  props: {
    salesTarget: Object,
  },

  methods: {

    saveData() {
      return SalesTarget.create(this.salesTarget);
    },

  },

  computed: {
    title() {
      return 'Редактирование цели';
    },
  },

  components: { SalesTargetEdit },
  mixins: [DialogComponent],

};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.buttons {
  margin-top: $margin-top * 2;
}

</style>

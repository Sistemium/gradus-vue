<template lang="pug">

el-dialog#sales-target-group-dialog(
:title="title"
:before-close="closeDialog"
:visible.sync="visible"
:append-to-body="true"
)
  .dialog-body(v-loading="busy")

    sales-target-group-form(
    ref="form"
    :sales-target-group="salesTargetGroup"
    :article-groups="articleGroups"
    )

    .buttons
      el-button(type="primary" @click="submitClick") Готово
      el-button(@click="closeDialog") Отмена

</template>
<script>

import log from 'sistemium-telegram/services/log';

import ArticleGroup from '@/models/ArticleGroup';
import SalesTargetGroup from '@/models/SalesTargetGroup';

import SalesTargetGroupForm from './SalesTargetGroupForm.vue';

const { error } = log('SalesTargetGroupDialog');

export default {

  name: 'SalesTargetGroupDialog',

  props: {
    salesTargetGroup: Object,
  },

  data() {

    const filter = {
      where: { articleGroupId: { '==': null } },
      orderBy: ['name'],
    };

    return {
      busy: false,
      visible: true,
      articleGroups: ArticleGroup.filter(filter),
    };

  },

  methods: {

    submitClick() {
      this.$refs.form.validate(this.onValidate);
    },

    closeDialog() {
      this.visible = false;
      this.$emit('closed');
    },

    async onValidate(res, errors) {

      if (!res) {

        error('validation', errors);

        this.$message({
          message: 'Данные некорректны!',
          type: 'warning',
          duration: 5000,
        });

        return;

      }

      const loading = this.$message({
        message: 'Сохранение данных ...',
        type: 'warning',
        duration: 0,
      });

      this.busy = true;

      try {
        const saved = await SalesTargetGroup.create(this.salesTargetGroup);
        this.visible = false;
        this.$emit('closed', saved);
      } catch (err) {
        error(err);
      }

      loading.close();
      this.busy = false;

    },

  },

  computed: {
    title() {
      return 'Редактирование группы целей';
    },
  },

  components: { SalesTargetGroupForm },

};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.buttons {

  display: flex;
  justify-content: space-between;
  flex-direction: row;

}

</style>

<template lang="pug">

el-dialog(
:title="title"
:before-close="closeDialog"
:visible.sync="visible"
:append-to-body="true"
)
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

import SalesTargetGroupForm from '@/components/SalesTargetGroupForm.vue';
import ArticleGroup from '@/models/ArticleGroup';
import SalesTargetGroup from '@/models/SalesTargetGroup';

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

      try {
        const saved = await SalesTargetGroup.create(this.salesTargetGroup);
        this.visible = false;
        this.$emit('closed', saved);
      } catch (err) {
        error(err);
      }

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

@import "../styles/variables";

.buttons {

  display: flex;
  justify-content: space-between;
  flex-direction: row;

}

</style>

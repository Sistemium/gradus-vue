<template lang="pug">

.sales-target-group-edit

  .header

    h2
      label Группа:
      strong {{ value && value.name }}

    el-button.del(@click="editGroup" size="mini" icon="el-icon-edit" circle)
    el-button.del(@click="delGroup" size="mini" icon="el-icon-delete" circle)
    el-button.add(type="primary" @click="addClick" size="mini") Добавить цель

  resize(:padding="105" :maximize="true")
    .sales-target(
    v-for="target in targets" :key="target.id"
    )
      .target-buttons
        confirm-button.del(type="text" @confirm="delTarget(target)" text="Удалить" size="mini")
        el-button.edit(@click="editTargetClick(target)" size="mini" icon="el-icon-edit" circle)
      sales-target-view(:target="target")

  sales-target-dialog(:sales-target="editingTarget" v-if="editingTarget" @closed="onDialogClose")

</template>
<script>

import log from 'sistemium-telegram/services/log';

import pull from 'lodash/pull';
import SalesTarget from '@/models/SalesTarget';
import SalesTargetGroup from '@/models/SalesTargetGroup';
import SalesTargetView from './SalesTargetView.vue';
import SalesTargetDialog from './SalesTargetDialog.vue';

const { error } = log('SalesTargetGroupEdit');


/**
 * @property {String} value.id
 */

export default {

  name: 'SalesTargetGroupEdit',
  props: {
    value: Object,
  },

  data() {

    return {
      targets: this.getTargets(),
      editingTarget: null,
    };
  },

  computed: {},

  methods: {

    getTargets() {
      const { value } = this;
      return value ? [...value.targets] : [];
    },

    editGroup() {
      this.$emit('edit-click');
    },

    editTargetClick(target) {
      this.editingTarget = target;
    },

    delGroup() {
      this.$confirm(`Удалить все группу целей «${this.value.name}»`, 'Внимание!', {
        confirmButtonText: 'Удалить',
        cancelButtonText: 'Нет, оставить',
        type: 'warning',
      })
        .then(async () => {
          try {
            await SalesTargetGroup.destroy(this.value);
          } catch (err) {
            this.showErrorMessage(err);
          }
        })
        .catch(() => {
        });
    },

    async delTarget(target) {

      try {
        await SalesTarget.destroy(target);
        const newTargets = pull(this.targets, target);
        this.targets = [...newTargets];
      } catch (err) {
        this.showErrorMessage(err);
      }

    },

    onDialogClose() {
      // if (res) {
      //   this.editingTarget = res;
      // }
      this.editingTarget = null;
      this.targets = this.getTargets();
    },

    addClick() {
      this.editingTarget = SalesTarget.mapper.createInstance({
        targetGroupId: this.value.id,
        articleIds: [],
        cnt: 1,
        ord: 1,
      });
    },

    showErrorMessage(err) {
      error(err.message);
      this.$message({
        message: 'Ошибка удаления',
        type: 'warning',
        duration: 5000,
      });
    },

  },

  watch: {
    value(newValue) {
      if (newValue) {
        this.targets = [...newValue.targets];
      } else {
        this.targets = [];
      }
    },
  },

  components: {
    SalesTargetView,
    SalesTargetDialog,
  },

};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.sales-target {
  margin-top: $margin-top * 2;
  position: relative;
}

label {
  margin-right: $margin-right;
}

.header {
  h2 {
    margin: 0;
    flex: 1;
  }

  display: flex;
  /*justify-content: space-between;*/
  align-items: center;
}

.target-buttons {
  position: absolute;
  top: 0;
  right: 0;
}

.stm-resize {
  padding-bottom: 70px;
  overflow-y: visible;
  /*height: 100%;*/
}

</style>

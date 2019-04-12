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
      confirm-button.del(type="text" @confirm="delTarget(target)" text="Удалить")
      sales-target-edit(:target="target")

</template>
<script>

import uuid from '@/lib/uuid';
import log from 'sistemium-telegram/services/log';

import pull from 'lodash/pull';
import SalesTarget from '@/models/SalesTarget';
import SalesTargetGroup from '@/models/SalesTargetGroup';
import SalesTargetEdit from './SalesTargetEdit.vue';

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
    const { value } = this;
    return {
      targets: value ? [...value.targets] : [],
    };
  },

  computed: {},

  methods: {

    editGroup() {
      this.$emit('edit-click');
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

    addClick() {
      const item = SalesTarget.mapper.createInstance({
        id: uuid(),
        targetGroupId: this.value.id,
        articleIds: [],
        cnt: 1,
        ord: 1,
      });
      this.targets.push(item);
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

  components: { SalesTargetEdit },

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

.sales-target > .del {
  position: absolute;
  top: -3px;
}

.stm-resize {
  padding-bottom: 70px;
  overflow-y: visible;
  /*height: 100%;*/
}

</style>

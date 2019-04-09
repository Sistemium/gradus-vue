<template lang="pug">

.sales-target-group-edit

  .header

    h2
      label Группа:
      strong {{ value && value.name }}

    el-button.add(type="primary" @click="addClick" size="small") Добавить цель

  resize(padding="105")
    .sales-target(
    v-for="target in targets" :key="target.id"
    )
      confirm-button.del(type="text" @confirm="delClick(target)" text="Удалить")
      sales-target-edit(:target="target")

</template>
<script>

import pull from 'lodash/pull';
import SalesTarget from '@/models/SalesTarget';
import SalesTargetEdit from './SalesTargetEdit.vue';

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

    delClick(item) {
      const newTargets = pull(this.targets, item);
      this.targets = [...newTargets];
    },

    addClick() {
      const item = SalesTarget.mapper.createInstance({
        targetGroupId: this.value.id,
        articleIds: [],
        cnt: 1,
      });
      this.targets.push(item);
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

@import "../styles/variables";

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
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.del {
  position: absolute;
  top: -3px;
}

.stm-resize {
  padding-bottom: 70px;
}

</style>

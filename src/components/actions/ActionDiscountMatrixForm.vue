<template lang="pug">

.action-discount-matrix-form

  .buttons
    .add-x
      button-edit(@click="editAxisClick(discountMatrix.axisY, 'axisY')")
      label(v-if="discountMatrix.axisY.length") Строки
      label.warning(v-else) Добавить строки
    .add-y
      button-edit(@click="editAxisClick(discountMatrix.axisX, 'axisX')")
      label(v-if="discountMatrix.axisX.length") Столбцы
      label.warning(v-else) Добавить столбцы

  .matrix(:style="matrixStyle" v-if="hasAxes")
    .cell.empty
    .cell.header(v-for="headerX in discountMatrix.axisX" :key="headerX.id")
      action-required(:action="{ required: headerX }")
    template(v-for="(itemY, yIdx) in discountMatrix.axisY")
      .cell.header
        action-required(:action="{ required: itemY }")
      template(v-for="(itemX, xIdx) in discountMatrix.axisX")
        .cell
          el-input-number(
            :controls="false"
            v-model="values[xIdx][yIdx]"
            size="mini"
            @change="onValueChange(xIdx, yIdx, itemX, itemY)"
          )

  action-axis-edit(
    v-if="editAxis"
    :axis="editAxis.axis"
    :name="editAxis.name"
    @closed="editAxis = null"
    @save="onAxisSave"
    @delete="onAxisDelete"
  )

</template>
<script>

import find from 'lodash/find';
import ActionRequired from '@/components/actions/ActionRequired.vue';
import ActionAxisEdit from '@/components/actions/ActionAxisEdit.vue';
import discountMatrixBase from '@/components/actions/discountMatrixBase';

const NAME = 'ActionDiscountMatrixForm';

export default {
  name: NAME,
  data() {
    return { editAxis: null };
  },
  methods: {
    onValueChange(xIdx, yIdx, x, y) {
      const coords = {
        x: x.id,
        y: y.id,
      };
      const value = find(this.discountMatrix.values, coords);
      const discountOwn = this.values[xIdx][yIdx] || 0;
      if (value) {
        value.discountOwn = discountOwn;
      } else {
        this.discountMatrix.values.push({
          ...coords,
          discountOwn,
        });
      }
    },
    editAxisClick(axis, name) {
      this.editAxis = {
        axis,
        name,
      };
    },
    onAxisDelete() {
      this.onAxisSave([]);
    },
    onAxisSave(axis) {
      this.discountMatrix[this.editAxis.name] = axis;
    },
  },
  props: {
    discountMatrix: Object,
  },
  components: {
    ActionAxisEdit,
    ActionRequired,
  },
  mixins: [discountMatrixBase],
};

</script>
<style scoped lang="scss">

@import "discountMatrixBase";

.el-input-number {
  width: 50px;
}

.buttons {
  display: flex;
  justify-content: space-between;

  > * + *, label {
    margin-left: $margin-right;
  }

  margin-bottom: $margin-top;
}

.warning {
  color: $orange;
}

.matrix {
  margin-bottom: $margin-top;
}

</style>

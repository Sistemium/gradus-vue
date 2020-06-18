<template lang="pug">

.action-discount-matrix-form

  .buttons
    .add-x
      button-edit(@click="editAxisClick(discountMatrix.axisY, 'axisY')")
      label Строки
    .add-y
      button-edit(@click="editAxisClick(discountMatrix.axisX, 'axisX')")
      label Столбцы

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

const NAME = 'ActionDiscountMatrixForm';

export default {
  name: NAME,
  data() {
    return { editAxis: null };
  },
  computed: {
    hasAxes() {
      const { axisX = [], axisY = [] } = this.discountMatrix;
      return axisY.length && axisX.length;
    },
    values() {
      const { values, axisX, axisY } = this.discountMatrix;
      return axisX.map(x => axisY.map(y => {
        const value = find(values, {
          x: x.id,
          y: y.id,
        });
        return value && value.discountOwn;
      }));
    },
    matrixStyle() {
      const { axisX } = this.discountMatrix;
      const auto = axis => axis.map(() => 'auto')
        .join(' ');
      return {
        'grid-template-columns': auto(['header', ...axisX]),
        // 'grid-template-rows': auto(axisX),
      };
    },
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
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.el-input-number {
  width: 50px;
}

.cell {
  background: white;
  padding: $padding;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.header {
  background: $gray-background;
  flex-direction: row;

  .action-required {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}

.matrix {
  display: grid;
  text-align: center;
  gap: 1px;
  background: $gray-border-color;
  margin-bottom: $margin-top;
  border: $list-cell-borders;
  // grid-auto-rows: 1fr;
}

.buttons {
  display: flex;

  > * + *, label {
    margin-left: $margin-right;
  }

  margin-bottom: $margin-top;
}

</style>

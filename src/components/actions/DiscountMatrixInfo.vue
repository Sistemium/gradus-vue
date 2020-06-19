<template lang="pug">

.discount-matrix-info.matrix(:style="matrixStyle" v-if="hasAxes")
  .cell.empty
  .cell.header(v-for="headerX in discountMatrix.axisX" :key="headerX.id")
    action-required(:action="{ required: headerX }")
  template(v-for="(itemY, yIdx) in discountMatrix.axisY")
    .cell.header
      action-required(:action="{ required: itemY }")
    template(v-for="(itemX, xIdx) in discountMatrix.axisX")
      .cell
        span(v-text="values[xIdx][yIdx]")

</template>
<script>

import ActionRequired from '@/components/actions/ActionRequired.vue';
import discountMatrixBase from '@/components/actions/discountMatrixBase';

const NAME = 'DiscountMatrixInfo';

export default {
  name: NAME,
  props: {
    discountMatrix: Object,
  },
  components: { ActionRequired },
  mixins: [discountMatrixBase],
};

</script>
<style scoped lang="scss">

@import "discountMatrixBase";

</style>

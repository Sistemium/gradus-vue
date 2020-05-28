<template lang="pug">

.action-discount-form

  h3.title Скидки:

  el-form-item.comp(label="% комп." prop="discountComp")
    el-input-number(v-model="discount.discountComp" :precision="3" :step="1" :max="100" :min="0")

  el-form-item.own(label="% комм." prop="discountOwn")
    el-input-number(v-model="discount.discountOwn" :precision="3" :step="1" :max="100" :min="0")

</template>
<script>

const NAME = 'ActionDiscountForm';

export default {
  name: NAME,
  props: {
    discount: {
      type: Object,
      required: true,
    },
  },
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.action-discount-form {
  display: grid;
  grid-template-columns: 50% 50%;
}

.title {
  grid-column: 1 / span 2;
}

.el-form-item {
  display: flex;
}

.own {
  grid-column: 2;
  justify-content: flex-end;
  padding-right: $margin-top;
}

.comp {
  grid-column: 1;
  justify-content: flex-end;
}

</style>

<template lang="pug">

.action-required-form
  h3.title Условия:
  el-form-item.pcs(label="Бутылок" prop="required.pcs")
    el-input-number(v-model="required.pcs" :step="1" :min="0")
  el-form-item.volume(label="Литров" prop="required.volume")
    el-input-number(v-model="required.volume" :step="1" :min="0")
  el-form-item.pcs(label="SKU" prop="required.sku")
    el-input-number(v-model="required.sku" :step="1" :min="0")
  el-form-item.cost(label="Сумма" prop="required.cost")
    el-input-number(v-model="required.cost" :step="1000" :min="0")

</template>
<script>

const NAME = 'ActionRequiredForm';

export default {
  name: NAME,
  props: {
    required: {
      type: Object,
      required: true,
    },
  },
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.action-required-form {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto auto auto;

  > .title {
    grid-column: 1 / span 2;
  }

  > .volume, > .cost, > .pcs, > .sku {
    display: flex;
    justify-content: flex-end;
  }

  > .pcs, > .sku {
    padding-right: $margin-top;
  }
}

</style>

<template lang="pug">

.action-required-form

  h3.title Объем закупки:

  el-form-item.pcs(label="Бутылок")
    el-input-number(v-model="required.pcs" :step="1" :min="0")
  el-form-item.sku(label="SKU")
    el-input-number(v-model="required.sku" :step="1" :min="0")

  el-form-item.volume(label="Литров")
    el-input-number(v-model="required.volume" :step="1" :min="0")
  el-form-item.volumeTo(label="Литров до")
    el-input-number(v-model="required.volumeTo" :step="1" :min="0")

  el-form-item.cost(label="Сумма ₽")
    el-input-number(v-model="required.cost" :step="1000" :min="0")
  el-form-item.costTo(label="Сумма до")
    el-input-number(v-model="required.costTo" :step="1000" :min="0")

  el-form-item.isMultiple
    el-checkbox(
      v-model="required.isMultiple"
    ) Кратно

  el-form-item.etc(label="Прочее" prop="etc")
    el-input(v-model="required.etc")

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
  //grid-template-rows: auto auto auto;

  > .title {
    grid-column: 1 / span 2;
  }

  .el-form-item {
    display: flex;
    justify-content: flex-end;
  }

  .isMultiple {
    justify-content: center;
  }

  > .pcs, > .volume, > .cost {
    padding-right: $margin-top;
  }
}

</style>

<template lang="pug">

el-select.month-select(
v-model="selectedMonth"
@input="onSelect"
placeholder="выберите"
)

  el-option(
  v-for="month in months"
  :key="month.id"
  :label="month.label"
  :value="month.id"
  )

</template>
<script>

export default {

  name: 'MonthSelect',

  data() {
    return { selectedMonth: this.value };
  },

  props: {
    value: String,
    months: Array,
  },

  methods: {
    onSelect(value) {
      this.$emit('input', value);
    },
  },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

</style>

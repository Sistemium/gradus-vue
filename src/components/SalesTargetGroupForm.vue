<template lang="pug">

el-form.sales-target-form(
:model="model"
:rules="rules"
ref="form"
)

  el-form-item(label="Товарная группа" prop="articleGroupId")

    el-select(
    v-model="model.articleGroupId"
    placeholder="Выберите товарную группу"
    )
      el-option(
      v-for="item in articleGroups" :key="item.id"
      :label="item.name"
      :value="item.id"
      )

  el-form-item(label="Название" prop="name")

    el-input(v-model="model.name")

</template>
<script>

const rules = {
  name: [
    {
      required: true,
      message: 'Укажите название',
      trigger: 'change',
    },
  ],
  articleGroupId: [
    {
      required: true,
      message: 'Выберите товарную группу',
      trigger: 'change',
    },
  ],
};

export default {

  name: 'SalesTargetForm',

  props: {
    salesTargetGroup: Object,
    articleGroups: Array,
  },

  data() {
    return {
      rules,
      model: this.salesTargetGroup,
    };
  },

  methods: {

    validate(cb) {
      return this.$refs.form.validate(cb);
    },

  },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

</style>

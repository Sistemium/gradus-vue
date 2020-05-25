<template lang="pug">

el-form.campaign-action-form(
  :rules="rules"
  :model="model"
  ref="form"
  size="small"
)
  el-form-item(label="Название" prop="name")
    el-input(v-model="model.name")

  el-form-item(prop="commentText")
    el-input(v-model="model.commentText" type="textarea" placeholder="Комментарий")

  el-form-item.num(label="% Коммерческая" prop="discountOwn")
    el-input-number(v-model="model.discountOwn" :precision="2" :step="0.1" :max="100")

  el-form-item.num(label="% Компенсируемая" prop="discountComp")
    el-input-number(v-model="model.discountComp" :precision="2" :step="0.1" :max="100")

</template>
<script>

const NAME = 'CampaignActionForm';

const rules = {
  name: [
    {
      required: true,
      message: 'Название нужно указать',
      trigger: 'change',
    },
  ],
};

export default {
  data() {
    return { rules };
  },
  props: {
    model: Object,
  },
  name: NAME,
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.num {
  display: flex;
  justify-content: flex-end;
}

</style>

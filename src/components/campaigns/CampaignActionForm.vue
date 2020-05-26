<template lang="pug">

el-form.campaign-action-form(
  :rules="rules"
  :model="model"
  ref="form"
  size="small"
)
  el-form-item.name(label="Название" prop="name")
    el-input(v-model="model.name")

  el-form-item.comment(prop="commentText")
    el-input(v-model="model.commentText" type="textarea" placeholder="Комментарий")

  el-form-item.discount.own(label="% комм." prop="discountOwn")
    el-input-number(v-model="model.discountOwn" :precision="2" :step="0.1" :max="100" :min="0")

  el-form-item.discount.comp(label="% комп." prop="discountComp")
    el-input-number(v-model="model.discountComp" :precision="2" :step="0.1" :max="100" :min="0")

  section.required
    h3.title Условия:
    el-form-item.pcs(label="Бутылок" prop="required.pcs")
      el-input-number(v-model="model.required.pcs" :step="1" :min="0")
    el-form-item.volume(label="Литров" prop="required.volume")
      el-input-number(v-model="model.required.volume" :step="1" :min="0")
    el-form-item.pcs(label="SKU" prop="required.sku")
      el-input-number(v-model="model.required.sku" :step="1" :min="0")
    el-form-item.cost(label="Сумма" prop="required.cost")
      el-input-number(v-model="model.required.cost" :step="1000" :min="0")

  .options

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

.discount {
  display: flex;
}

.own {
  grid-column: 1;
  justify-content: flex-end;
  padding-right: $margin-top;
}

.comp {
  grid-column: 2;
  justify-content: flex-end;
}

.name {
  grid-column: 1 / span 2;
}

.comment {
  grid-column: 1 / span 2;
}

.required {
  grid-column: 1 / span 2;
}

.campaign-action-form {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto auto auto auto;
}

.required {
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

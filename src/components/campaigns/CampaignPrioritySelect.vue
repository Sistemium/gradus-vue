<template lang="pug">

el-select.campaigns-priority-select(
  v-model="model"
  :placeholder="placeholder"
  :clearable="true"
)
  el-option(
    v-for="option in options" :key="option.id"
    :label="option.name"
    :value="option.id"
  )

</template>
<script>

import { campaignsPriorities } from '@/services/campaigns';

const NAME = 'CampaignPrioritySelect';

export default {
  name: NAME,
  data() {
    return {
      model: this.value,
    };
  },
  props: {
    value: String,
    readonly: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: 'выберите приоритет',
    },
  },
  computed: {
    options() {
      return campaignsPriorities();
    },
  },
  watch: {
    model(value) {
      this.$emit('input', value);
    },
  },
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.campaigns-priority-select {
  width: 250px;
}

</style>

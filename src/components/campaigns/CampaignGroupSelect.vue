<template lang="pug">

.campaign-group-select(v-if="readonly") {{ label }}
el-select.campaign-group-select(v-model="model" :placeholder="placeholder" v-else :clearable="true")
  el-option(
    v-for="option in options" :key="option.value"
    :label="option.label"
    :value="option.value"
  )

</template>
<script>

import find from 'lodash/find';
import { campaignGroups } from '@/services/campaigns';
import SalesTeam from '@/models/SalesTeam';

const NAME = 'CampaignGroupSelect';

export default {
  name: NAME,
  props: {
    value: String,
    readonly: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: 'выберите группу',
    },
  },
  data() {
    return {
      model: this.value,
      options: campaignGroups(),
    };
  },
  computed: {
    label() {
      const { value } = this;
      if (!value) {
        return '';
      }
      const option = find(this.options, { value });
      return option && option.label;
    },
  },
  watch: {
    model(value) {
      this.$emit('input', value);
    },
  },
  created() {
    this.$bindToModel(SalesTeam);
  },
  beforeUpdate() {
    this.options = campaignGroups();
  },
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

</style>

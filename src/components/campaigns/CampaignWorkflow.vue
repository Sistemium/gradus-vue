<template lang="pug">

el-dropdown.campaign-workflow(@command="onCommand")
  el-button(:type="step.style" size="mini" :disabled="disabled") {{ step.label }}
  el-dropdown-menu(slot="dropdown")
    el-dropdown-item(
      v-for="option in options" :key="option.to"
      :command="option.to"
    ) {{ option.label }}

</template>
<script>

import { campaignWorkflow } from '@/services/campaigns';

const NAME = 'CampaignWorkflow';

export default {
  name: NAME,
  data() {
    return {
      workflow: campaignWorkflow,
    };
  },
  computed: {
    step() {
      return this.workflow.step(this.processing);
    },
    options() {
      const { step } = this;
      return (step && step.options) || [];
    },
  },
  methods: {
    onCommand(to) {
      this.$emit('transition', to);
    },
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    processing: String,
  },
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

</style>

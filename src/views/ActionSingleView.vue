<template lang="pug">

.action-single-view
  action-flyer(:action="action" v-if="action")

</template>
<script>

import Action from '@/models/Action';
import Campaign from '@/models/Campaign';
import ActionFlyer from '@/components/actions/ActionFlyer.vue';

const NAME = 'ActionSingleView';

export default {

  props: {
    actionId: {
      type: String,
      required: true,
    },
  },

  computed: {
    action() {
      return Action.reactiveGet(this.actionId);
    },
    campaign() {
      const { action } = this;
      return action ? Campaign.reactiveGet(action.campaignId) : null;
    },
  },

  created() {

    this.$watchImmediate('actionId', actionId => {
      if (!actionId) {
        return;
      }
      if (!this.action) {
        Action.find(actionId);
      }
    });

    this.$watchImmediate('action.campaignId', campaignId => {
      if (!campaignId) {
        return;
      }
      if (!this.campaign) {
        Campaign.find(campaignId);
      }
    });

  },

  name: NAME,

  components: {
    ActionFlyer,
  },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.action-single-view {
  position: relative;
  height: 700px;
  overflow: hidden;
}

.action-flyer {
  position: absolute;
  min-height: 700px;
  top:0;
  padding: $margin-top;
}

</style>

<template lang="pug">

.campaigns-pictures-list
  .campaign(
    v-for="campaign in campaigns" :key="campaign.id"
  )
    .wrapper(
      v-for="action in campaign.actions" :key="action.id"
    )
      action-flyer(
        :action="action"
        :max-height="690"
      )

</template>
<script>

import ActionFlyer from '@/components/actions/ActionFlyer.vue';

const NAME = 'CampaignsFlyers';

export default {
  name: NAME,

  props: {
    campaigns: Array,
  },

  components: { ActionFlyer },

  head: {
    style: [
      {
        type: 'text/css',
        inner: '@page { size: A4 landscape }',
      },
    ],
  },

};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.wrapper {
  overflow: hidden;
  position: relative;
  height: 695px;
  page-break-inside: avoid;
  box-sizing: border-box;
}

.action-flyer {
  width: 1024px;
  min-width: 100%;
  max-width: 1024px;
  min-height: 690px;
  @media print {
    border: none;
    padding: 0;
  }
  position: absolute;
  top:0;
  margin-left: auto;
  margin-right: auto;
}

@media screen {
  .wrapper, .campaign + .campaign {
    margin-top: $margin;
  }
}

</style>

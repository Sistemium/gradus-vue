<template lang="pug">

.campaigns-pictures-list
  .campaign(
    v-for="campaign in campaigns" :key="campaign.id"
  )
    action-flyer(
      v-for="action in campaign.actions" :key="action.id"
      :action="action"
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
        inner: '@page { size: A4 landscape; }',
      },
    ],
  },

};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.action-flyer {
  width: 100%;
  min-width: 100%;
  page-break-inside: avoid;
  page-break-after: always;
  border: none;
}

@media screen {
  .action-flyer + .action-flyer, .campaign + .campaign {
    margin-top: $margin;
  }
}

</style>

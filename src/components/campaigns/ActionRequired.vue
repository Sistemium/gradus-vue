<template lang="pug">

.action-required(v-if="required")
  .pcs(v-if="required.pcs") {{ required.pcs }} б.
  .volume(v-if="required.volume") {{ required.volume }} л.
  .sku(v-if="required.sku") {{ required.sku }} SKU
  .cost(v-if="required.cost") {{ required.cost }} ₽

</template>
<script>

import actionBase from '@/components/campaigns/actionBase';

const NAME = 'ActionRequired';

export default {
  name: NAME,
  computed: {
    required() {
      return this.action.required;
    },
  },
  mixins: [actionBase],
};

</script>
<style scoped lang="scss">

@import "./actionBase";

.action-required {

}

</style>

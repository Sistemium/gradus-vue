<template lang="pug">

td.action-required(v-if="hasRequired || always")
  .pcs(v-if="required.pcs") {{ required.pcs }} б.
  .volume(v-if="required.volume") {{ required.volume }} л.
  .sku(v-if="required.sku") {{ required.sku }} SKU
  .cost(v-if="required.cost") {{ required.cost }} ₽

</template>
<script>

import actionBase from './actionBase';

const NAME = 'ActionRequired';

export default {
  name: NAME,
  computed: {
    required() {
      return this.action.required || {};
    },
  },
  props: {
    always: {
      type: Boolean,
      default: false,
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

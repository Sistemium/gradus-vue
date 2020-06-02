<template lang="pug">

td.action-required(v-if="hasRequired || always")
  .pcs(v-if="required.pcs")
    span.from(v-if="!required.isMultiple") от
    span {{ required.pcs }} бут.
  .volume(v-if="required.volume")
    span.from(v-if="!required.isMultiple") от
    span {{ required.volume }} л.
  .sku(v-if="required.sku") {{ required.sku }} SKU
  .cost(v-if="required.cost") {{ required.cost }} ₽
  .isMultiple(v-if="required.isMultiple") (кратно)

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

.isMultiple {
  font-size: small;
  // color: $light-gray;
}

.action-required > * {
  & + * {
    margin-top: $padding/2;
  }

  > * + * {
    margin-left: 4px;
  }
}

</style>

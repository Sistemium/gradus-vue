<template lang="pug">

.action-required(v-if="hasRequired || always")
  .pcs(v-if="required.pcs")
    span.from(v-if="!required.isMultiple") от
    span {{ required.pcs }} бут.
  .volume(v-if="required.volume")
    span.from(v-if="!required.isMultiple || required.volumeTo") от
    span {{ required.volume }}
    span(v-if="required.volumeTo") до {{ required.volumeTo }}
    span л.
  .cost(v-if="required.cost")
    span.from(v-if="!required.isMultiple") от
    span {{ required.cost }}
    span(v-if="required.costTo") до {{ required.costTo }}
    span ₽
  .etc(v-if="required.etc") {{ required.etc }}
  .sku(v-if="required.sku") {{ required.sku }} SKU
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
    parentAction: {
      type: Object,
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

.sku {
  color: $orange;
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

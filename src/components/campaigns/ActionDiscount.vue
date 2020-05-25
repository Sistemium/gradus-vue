<template lang="pug">

td.action-discount(v-if="discount")
  .own(v-if="discount.own") {{ discount.own }}
  .comp(v-if="discount.comp") {{ discount.comp }}

</template>
<script>

import actionBase from '@/components/campaigns/actionBase';

const NAME = 'ActionDiscount';

export default {
  name: NAME,
  computed: {

  },
  mixins: [actionBase],
};

</script>
<style scoped lang="scss">

@import "./actionBase";

</style>

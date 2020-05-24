<template lang="pug">

.action-discount(v-if="discount")
  .own(v-if="discount.own") {{ discount.own }}% комм
  .comp(v-if="discount.comp") {{ discount.comp }}% комп

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

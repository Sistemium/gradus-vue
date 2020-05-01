<template lang="pug">

.campaigns-list
  .list-group
    .list-group-item(
      v-for="item in campaigns" :key="item.id"
      @click.prevent="itemClick(item)"
      :class="value && value.id === item.id && 'active'"
    )
      span.name {{ item.name }}

</template>
<script>

const NAME = 'CampaignsList';

export default {
  name: NAME,
  props: {
    campaigns: Array,
    value: Object,
  },
  methods: {
    itemClick(item) {
      // const { value } = this;
      this.$emit('input', item);
    },
  },
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

</style>

<template lang="pug">

.campaigns-list
  .list-group(ref="listGroup")
    .list-group-item(
      v-for="item in campaigns" :key="item.id"
      :id="`c-${item.id}`"
      @click.prevent="itemClick(item)"
      :class="value && value.id === item.id && 'active'"
    )
      span.name {{ item.name }}
      .badge(v-if="item.pictures.length")
        span {{ item.pictures.length }}
      .warning(v-else) ⚠️

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

@import "../../styles/badge";

.badge {
  @extend %badge;
}

.list-group-item {
  display: flex;
  justify-content: space-between;
}

</style>

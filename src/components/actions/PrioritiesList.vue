<template lang="pug">

.priorities-list.list-group(v-if="priorities.length")
  .list-group-header
    i.el-icon-s-flag
    span Приоритетное
  .list-group-item(
    v-for="item in priorities"
    :id="`c-${item.id}`"
    @click.prevent="itemClick(item)"
    :class="[value && value.id === item.id && 'active']"
  ) {{ item.name }}

</template>
<script>

import { campaignsPriorities, campaignsWithPriorityActions } from '@/services/campaigns';
import CampaignsPriority from '@/models/CampaignsPriority';

const NAME = 'PrioritiesList';

export default {
  name: NAME,
  props: {
    campaigns: {
      type: Array,
      required: true,
    },
    value: Object,
  },
  data() {
    return {
      allPriorities: campaignsPriorities(),
    };
  },
  computed: {
    priorities() {
      return this.allPriorities
        .filter(({ id }) => campaignsWithPriorityActions(this.campaigns, id).length);
    },
  },
  methods: {
    itemClick(item) {
      // const { value } = this;
      this.$emit('input', item);
    },
  },
  created() {
    this.$bindToModel(CampaignsPriority);
  },
  beforeUpdate() {
    this.allPriorities = campaignsPriorities();
  },
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.list-group-header {
  i {
    margin-right: $padding;
  }
}

</style>

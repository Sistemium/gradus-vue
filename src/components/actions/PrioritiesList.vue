<template lang="pug">

.priorities-list.list-group(v-if="priorities.length")
  .list-group-header(
    @click.prevent="itemClick({ id: 'ALL' })"
    :class="[value === 'ALL' && 'active']"
  )
    i.el-icon-s-flag
    span Приоритетное
  .list-group-item(
    v-for="item in priorities"
    :id="`c-${item.id}`"
    @click.prevent="itemClick(item)"
    :class="[value === item.id && 'active']"
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
    value: String,
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
      this.$emit('input', item.id);
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

  color: $blue;
  cursor: pointer;

  i {
    margin-right: $padding;
  }

  &:hover {
    color: $primary-hover-color;
  }

  &.active {
    background: $primary-color;
    color: white;
  }

}

</style>

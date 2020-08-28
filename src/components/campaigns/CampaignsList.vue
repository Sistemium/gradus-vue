<template lang="pug">

.campaigns-list
  .list-group(v-for="group in groupedCampaigns" :key="group.code")
    .list-group-header(:key="group.code") {{ group.label }}
    .list-group-item(
      v-for="item in group.campaigns" :key="item.id"
      :id="`c-${item.id}`"
      @click.prevent="itemClick(item)"
      :class="value && value.id === item.id && 'active'"
    )
      span.name {{ item.name }}
      template(v-if="hasAuthoring")
        .badge(v-if="item.pictures.length")
          span {{ item.pictures.length }}
        .warning(v-else)
          i.el-icon-warning

</template>
<script>

import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import filter from 'lodash/filter';
import { campaignGroups } from '@/services/campaigns';
import CampaignPicture from '@/models/CampaignPicture';
import campaignsAuth from '@/components/campaigns/campaignsAuth';

const NAME = 'CampaignsList';

export default {
  name: NAME,
  props: {
    campaigns: Array,
    value: Object,
  },
  computed: {
    groupedCampaigns() {
      const grouped = groupBy(this.campaigns, ({ groupCode }) => groupCode || 'Без группы');
      const groups = [...campaignGroups(), {
        value: 'Без группы',
        label: 'Без группы',
        order: -1,
      }];
      const matching = map(groups, ({ value, label, order }) => ({
        value,
        label,
        order,
        campaigns: grouped[value],
      }));
      return filter(orderBy(matching, 'order'), 'campaigns');
    },
  },
  methods: {
    itemClick(item) {
      // const { value } = this;
      this.$emit('input', item);
    },
  },
  created() {
    this.$bindToModel(CampaignPicture);
  },
  mixins: [campaignsAuth],
};

</script>
<style scoped lang="scss">

@import "../../styles/badge";
@import "../../styles/responsive";

.badge {
  @extend %badge;
  margin-left: $padding;
}

.list-group-item {
  display: flex;
  justify-content: space-between;
}

.warning {
  color: $orange;
  font-size: 22px;
}

@include responsive-only(lt-md) {
  .warning, .badge {
    display: none;
  }
}

</style>

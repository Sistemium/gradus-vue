<template lang="pug">

.campaigns-list
  .list-group(v-for="group in groupedCampaigns" :key="group.code")
    .list-group-header(:key="group.code") {{ group.label }}
    .list-group-item(
      v-for="item in group.campaigns" :key="item.id"
      :id="`c-${item.id}`"
      @click.prevent="itemClick(item)"
      :class="[value && value.id === item.id && 'active', item.processing || 'draft']"
    )
      span.name {{ item.name }}
      template(v-if="hasAuthoring")
        .badge(v-if="badgeCount(item)")
          span {{ badgeCount(item) }}
        .warning(v-else)
          i.el-icon-warning

</template>
<script>

import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import filter from 'lodash/filter';
import { campaignGroups, campaignsPriorities } from '@/services/campaigns';
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
      const grouped = groupBy(this.campaigns, ({ groupCode, priorityId }) => priorityId || groupCode || 'Без группы');
      const groups = [
        ...campaignsPriorities()
          .map(({ id, name }) => ({
            value: id,
            label: name,
          })),
        {
          value: 'Без группы',
          label: 'Без группы',
        },
        ...campaignGroups(),
      ];
      const matching = map(groups, ({ value, label, order }) => ({
        value,
        label,
        order,
        campaigns: grouped[value],
      }));
      return filter(matching, 'campaigns');
    },
  },
  methods: {
    itemClick(item) {
      // const { value } = this;
      this.$emit('input', item);
    },
    badgeCount(campaign) {
      const { pictures, actions } = campaign;
      return pictures.length
        + filter(actions, ({ layout = {} }) => layout.pictures && layout.pictures.length).length;
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

.list-group-item:not(.active) {
  &.draft {
    background: $light-green;
  }

  &.archive {
    color: $gray;
  }
}

</style>

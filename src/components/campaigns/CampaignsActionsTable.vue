<template lang="pug">

.campaigns-actions-table

  table.campaign(
    v-for="campaign in campaignsWithActions" :key="campaign.id"
    :id="`c-${campaign.id}`"
  )
    thead
      tr
        td
          .name
            i.el-icon-s-management
            a(@click="campaignClick(campaign)")
              span {{ campaign.name }}
            button-edit(@click="onEditCampaign(campaign)" v-if="hasAuthoring")
          .fields
            .oneTime(v-if="campaign.oneTime")
              i.el-icon-circle-check
              span Единовременная
            .repeatable(v-if="campaign.repeatable")
              i.el-icon-circle-check
              span Многократная
            .needPhoto(v-if="campaign.needPhoto")
              i.el-icon-camera-solid
              span Фото-отчет
            .territory(v-if="campaign.territory")
              i.el-icon-location
              span {{ campaign.territory }}
          .priority(v-if="campaign.priority")
            i.el-icon-star-on
            span {{ campaign.priority.name }}
          .period(v-if="showPeriod(campaign)")
            i.el-icon-date
            span c {{ campaign.dateB | ruDate }} по {{ campaign.dateE | ruDate }}
    tbody.actions
      //tr
        td
          .fields
      tr(v-for="action in campaignActions(campaign)" :key="action.id")
        td
          campaign-action(:action="action" :hide-priority="!!priorityId")

  router-view

</template>
<script>

import filter from 'lodash/filter';
import orderBy from 'lodash/orderBy';
import { createNamespacedHelpers } from 'vuex';
import Action from '@/models/Action';
import { dateBE } from '@/lib/dates';
import CampaignAction from '@/components/campaigns/CampaignAction.vue';
import campaignsAuth from '@/components/campaigns/campaignsAuth';
import * as getters from '@/vuex/campaigns/getters';

const { mapGetters } = createNamespacedHelpers('campaigns');

const NAME = 'CampaignsActionsTable';

export default {
  computed: {
    campaignsWithActions() {
      const withActions = filter(this.campaigns, c => c.actions.length && c.processing === 'published');
      return orderBy(withActions, ({ priority }) => priority && (priority.ord || priority.id));
    },
    ...mapGetters({ selectedMonth: getters.SELECTED_MONTH }),
    monthBE() {
      return dateBE(this.selectedMonth);
    },
  },
  methods: {
    campaignActions({ actions }) {
      const { priorityId } = this;
      return priorityId ? actions.filter(a => a.priorityId === priorityId) : actions;
    },
    showPeriod(campaign) {
      const { dateE, dateB } = this.monthBE;
      return campaign.dateE !== dateE || campaign.dateB !== dateB;
    },
    scrollToCampaign(campaignId) {
      if (!campaignId) {
        return;
      }
      this.$scrollTo(`#c-${campaignId}`, 500, {
        container: '#campaigns-scroll-container',
        force: false,
      });
    },
    campaignClick({ id: campaignId }) {
      this.updateRouteParams({ campaignId });
    },
    onEditCampaign(campaign) {
      this.$emit('editCampaign', campaign);
    },
  },
  created() {
    this.$bindToModel(Action);
    if (this.priorityId) {
      return;
    }
    this.$watchImmediate('$route.params.campaignId', campaignId => {
      this.$nextTick(() => {
        this.scrollToCampaign(campaignId);
        // this.$debug('scrollToCampaign', campaignId);
      });
    });
  },
  props: {
    campaigns: Array,
    priorityId: String,
  },
  components: {
    CampaignAction,
  },
  mixins: [campaignsAuth],
  name: NAME,
  head: {
    style: [
      {
        type: 'text/css',
        inner: '@page { size: A4 portrait; }',
        undo: true,
      },
    ],
  },
};

</script>
<style scoped lang="scss">

@import "campaignsBase";

@media print {

  .campaigns-actions-table ::v-deep .campaign-action {
    page-break-inside: avoid;
    @import "campaignActionTight";
    @import "../actions/actionOptionTight";
  }

}

.name {
  padding: $margin-top 0;
  font-size: x-large;
  font-weight: 500;
  position: sticky;
  top: 0;
  background: white;
  color: $gray;

  display: flex;
  align-items: center;

  button {
    margin-left: $margin-right;
  }

  @media print {
    padding: $margin-top-print 0;
    font-size: $font-size-x-large-print;
  }

  > i {
    margin-right: $margin-top;
    @media print {
      margin-right: $margin-top-print;
    }
  }

}

.campaign-action, .fields {
  margin-left: auto;
  @media screen {
    max-width: 900px;
  }
  @media print {
    max-width: 17.5cm;
  }
}

.fields {
  margin-left: $margin-right;

  > * + * {
    margin-top: 0;
  }
}

table {
  border-spacing: 0;
  width: 100%;
}

tr + tr > td {
  padding-top: $margin-top;
  @media print {
    padding-top: $margin-top-print;
  }
}

@media print {
  .campaigns-actions-table {
    font-size: $font-size-print;
  }
}

a {
  cursor: pointer;
}

thead td {

  display: flex;
  align-items: center;
  font-weight: bold;

  @media print {
    font-size: $font-size-large-print;
  }

  .name {
    flex: 1;
  }

  .period, .priority {

    margin-left: $margin-right;
    background: $light-gray;
    padding: $padding;
    color: white;

    i {
      color: $orange;
      margin-right: $padding;
    }

  }

}

</style>

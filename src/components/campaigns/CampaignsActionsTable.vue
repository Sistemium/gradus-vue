<template lang="pug">

.campaigns-actions-table

  campaigns-header(:month="selectedMonth")

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
          .period(v-if="showPeriod(campaign)")
            i.el-icon-date
            span c {{ campaign.dateB | ruDate }} по {{ campaign.dateE | ruDate }}
    tbody.actions
      tr
        td
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
      tr(v-for="action in campaign.actions" :key="action.id")
        td
          campaign-action(:action="action" )

  router-view

</template>
<script>

import filter from 'lodash/filter';
import { createNamespacedHelpers } from 'vuex';
import Action from '@/models/Action';
import { dateBE } from '@/lib/dates';
import CampaignAction from '@/components/campaigns/CampaignAction.vue';
import CampaignsHeader from '@/components/campaigns/CampaignsHeader.vue';
import campaignsAuth from '@/components/campaigns/campaignsAuth';
import * as getters from '@/vuex/campaigns/getters';

const { mapGetters } = createNamespacedHelpers('campaigns');

const NAME = 'CampaignsActionsTable';

export default {
  computed: {
    campaignsWithActions() {
      return filter(this.campaigns, ({ actions }) => actions.length);
    },
    ...mapGetters({ selectedMonth: getters.SELECTED_MONTH }),
    monthBE() {
      return dateBE(this.selectedMonth);
    },
  },
  methods: {
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
    this.$watch('$route.params.campaignId', campaignId => {
      this.$nextTick(() => {
        this.scrollToCampaign(campaignId);
      });
    }, { immediate: true });
    this.$bindToModel(Action);
  },
  props: {
    campaigns: Array,
  },
  components: {
    CampaignsHeader,
    CampaignAction,
  },
  mixins: [campaignsAuth],
  name: NAME,
};

</script>
<style scoped lang="scss">

@import "campaignsBase";

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
}

.fields {
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
  justify-content: space-between;
  font-weight: bold;
  font-size: $font-size-large-print;

  .el-icon-date {
    color: $orange;
    margin-right: $margin-right;
  }

  .period {
    background: $light-gray;
    padding: $padding;
    //font-weight: normal;
    color: white;
  }

}

</style>

<template lang="pug">

.campaign-filters

  .period
    label Период:
    month-select(:months="lastYearMonths" v-model="selectedMonth")

  campaign-group-select(v-model="campaignGroup" placeholder="все группы")

  search-input(v-model="searchText" :debounce="100")

</template>
<script>

import { createNamespacedHelpers } from 'vuex';
import { monthGenerator } from '@/lib/dates';
import * as getters from '@/vuex/campaigns/getters';
import * as actions from '@/vuex/campaigns/actions';
import MonthSelect from '@/components/MonthSelect.vue';
import CampaignGroupSelect from '@/components/campaigns/CampaignGroupSelect.vue';

const { mapActions, mapGetters } = createNamespacedHelpers('campaigns');

const NAME = 'CampaignFilters';

export default {

  name: NAME,

  computed: {

    lastYearMonths() {
      return monthGenerator(12, Date());
    },

    campaignGroup: {
      get() {
        return this.$route.query.campaignGroup || null;
      },
      set(campaignGroup) {
        this.updateRouteParams({}, { campaignGroup: campaignGroup || undefined });
      },
    },

    selectedMonth: {
      ...mapGetters({ get: getters.SELECTED_MONTH }),
      ...mapActions({ set: actions.SELECT_MONTH }),
    },

    searchText: {
      ...mapGetters({ get: getters.SEARCH_TEXT }),
      ...mapActions({ set: actions.SEARCH_TEXT_CHANGE }),
    },

  },

  created() {
    this.$watchImmediate('$route.params.monthId', monthId => {
      this.selectedMonth = monthId || this.selectedMonth || this.lastYearMonths[1].id;
      if (!monthId) {
        this.updateRouteParams({ monthId: this.selectedMonth });
      }
    });
  },

  watch: {
    selectedMonth(monthId) {
      this.updateRouteParams({ monthId });
    },
  },

  components: {
    CampaignGroupSelect,
    MonthSelect,
  },

};

</script>
<style scoped lang="scss">

@import "../../styles/variables";
@import "../../styles/responsive";

.month-select {
  @include responsive-only(gt-sm) {
    margin-left: 10px;
  }
}

.search-input {

  @include responsive-only(gt-xxs) {
    margin-left: 10px;
  }
  max-width: 200px;

}

.campaign-filters {

  display: flex;

  @include responsive-only(xxs) {
    flex-direction: column;
  }

  label {
    margin-left: $margin-right;
    font-weight: bold;
  }

  .period {
    white-space: nowrap;
    @include responsive-only(lt-md) {
      label {
        display: none;
      }
    }
  }

  .campaign-group-select {
    margin-left: $padding;
    display: block;
  }

}

</style>

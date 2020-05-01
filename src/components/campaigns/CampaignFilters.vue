<template lang="pug">

.campaign-filters

  .period
    label Период:
    month-select(:months="lastYearMonths" v-model="selectedMonth")

  search-input(v-model="searchText")

</template>
<script>

import { createNamespacedHelpers } from 'vuex';
import { monthGenerator } from 'sistemium-telegram/services/moments';
import * as getters from '@/vuex/campaigns/getters';
import * as actions from '@/vuex/campaigns/actions';
import MonthSelect from '@/components/MonthSelect.vue';

const { mapActions, mapGetters } = createNamespacedHelpers('campaigns');

const NAME = 'CampaignFilters';

export default {

  name: NAME,

  computed: {

    lastYearMonths() {
      return monthGenerator(12, Date());
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
    const immediate = !this.selectedMonth;
    this.$watch('$route.params.monthId', monthId => {
      this.selectedMonth = monthId || this.lastYearMonths[1].id;
    }, { immediate });
  },

  watch: {
    selectedMonth(monthId) {
      const { name, params = {} } = this.$route;
      if (params.monthId === monthId) {
        return;
      }
      this.$router.push({
        name,
        params: {
          ...params,
          monthId,
        },
      });
    },
  },

  components: { MonthSelect },

};

</script>
<style scoped lang="scss">

@import "../../styles/variables";
@import "../../styles/responsive";

.month-select {
  @include responsive-only(gt-xs) {
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
    @include responsive-only(lt-sm) {
      label {
        display: none;
      }
    }
  }

}

</style>

<template lang="pug">

h1.campaigns-header
  .name
    span Акции
    template(v-if="groupLabel")
      // span отдела
      span {{ groupLabel }}
    span на
    span {{ periodLabel }}
  .logo
    img(src="/images/logo-r50.jpg")

</template>
<script>

import CampaignGroupSelect from '@/components/campaigns/CampaignGroupSelect.vue';
import MonthSelect from '@/components/MonthSelect.vue';
import * as getters from '@/vuex/campaigns/getters';
import { campaignGroups } from '@/services/campaigns';
import { createNamespacedHelpers } from 'vuex';
import dayjs from 'dayjs';
import find from 'lodash/find';

const { mapGetters } = createNamespacedHelpers('campaigns');
const NAME = 'CampaignsHeader';

export default {
  name: NAME,
  components: {
    CampaignGroupSelect,
    MonthSelect,
  },
  computed: {
    ...mapGetters({ selectedMonth: getters.SELECTED_MONTH }),
    campaignGroup() {
      return this.$route.query.campaignGroup || null;
    },
    periodLabel() {
      return dayjs(this.selectedMonth)
        .locale('ru')
        .format('MMMM YYYY');
    },
    groupLabel() {
      const { campaignGroup: value } = this;
      if (!value) {
        return '';
      }
      const option = find(campaignGroups(), { value });
      return option && option.label;
    },
  },
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.campaigns-header {

  @media screen {
    display: none;
  }

  display: flex;
  font-size: 27px;

  * + * {
    margin-left: $padding;

  }

  justify-content: space-between;

  .logo img {
    max-width: 300px;
  }

}

</style>

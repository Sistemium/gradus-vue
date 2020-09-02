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

import { campaignGroups } from '@/services/campaigns';
import dayjs from 'dayjs';
import find from 'lodash/find';

const NAME = 'CampaignsHeader';

export default {
  name: NAME,
  props: { month: String },
  computed: {
    campaignGroup() {
      return this.$route.query.campaignGroup || null;
    },
    periodLabel() {
      return dayjs(this.month)
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
    max-width: 260px;
  }

}

</style>

<template lang="pug">

el-table.campaigns-table(
:data="campaigns"
@cell-click="cellClick"
:default-sort="{prop: 'name'}"
)
  el-table-column(
  prop="name"
  label="Название"
  )
  el-table-column(
  :formatter="dateBFormatter"
  label="Дата начала"
  )
  el-table-column(
  :formatter="dateEFormatter"
  label="Дата окончания"
  )
  el-table-column(
  width="90"
  label="Картинки"
  )
    template(slot-scope="scope")
      campaign-avatar(:campaign="scope.row")

</template>
<script>

import { longDate } from 'sistemium-telegram/services/moments';

import CampaignAvatar from '@/components/campaigns/CampaignAvatar.vue';

export default {

  name: 'CampaignsTable',

  props: {
    campaigns: Array,
  },

  methods: {

    dateBFormatter(date) {
      return longDate(date.dateB);
    },

    dateEFormatter(date) {
      return longDate(date.dateE);
    },

    cellClick(row, column) {
      this.$emit('cell-click', row, column);
    },

  },

  components: { CampaignAvatar },

};

</script>
<style scoped lang="scss">

@import "../../styles/variables";


.campaigns-table /deep/ .el-table__row {
  cursor: pointer;
}

.placeholder {
  width: 100%;
}

</style>

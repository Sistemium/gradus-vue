<template lang="pug">

el-dialog.perfect-shop-stats-dialog(
  :fullscreen="true"
  :show-close="true"
  :visible.sync="visible"
  custom-class="el-dialog-gallery"
  @closed="onClose()"
  :append-to-body="true"
  center
)

  template(slot="title" v-if="stat")
    h1
      .name {{ stat.outlet.name }}
      .address
        small {{ stat.outlet.address }}

  outlet-perfect-shop-info(:stat="perfectShop.stats[nextLevel]")

</template>
<script>

import DialogComponent from '@/lib/DialogComponent';
import * as svc from '@/services/territory';
import OutletPerfectShopInfo from '@/components/perfectShop/OutletPerfectShopInfo.vue';

const NAME = 'PerfectShopStatsDialog';

export default {

  name: NAME,
  components: { OutletPerfectShopInfo },

  created() {
    this.visible = true;
  },

  computed: {

    perfectShop() {
      const { stats } = this.stat || {};
      return stats ? stats.perfectShop : null;
    },

    stat() {
      return svc.perfectShopStatById(this.$route.params.statId);
    },

    nextLevel() {
      const { nextLevel } = this.perfectShop || {};
      return nextLevel;
    },

    title() {
      return this.stat ? 'Детализация Perfect Shop' : 'Загрузка ...';
    },
  },

  methods: {
    onClose() {
      this.closeDialog();
      this.$router.replace({
        name: 'PerfectShop',
        query: this.$route.query,
      });
    },
  },

  mixins: [DialogComponent],

};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.outlet-perfect-shop-info {
  color: $black;
}

</style>

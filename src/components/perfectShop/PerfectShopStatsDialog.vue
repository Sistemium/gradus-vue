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
    h1 Показатели участия в акции Perfect Shop
    .outlet
      .name {{ stat.outlet.name }}
      .address
        small {{ stat.outlet.address }}

  el-form
    el-form-item(label="Уровень акции")
      stat-level-input(v-model="level" :levels="levels")

  resize(v-if="level" :padding="20")
    outlet-perfect-shop-info(:stat="perfectShop.stats[level]")

</template>
<script>

import DialogComponent from '@/lib/DialogComponent';
import * as svc from '@/services/territory';
import { perfectShopLevels } from '@/services/perfectShop';
import OutletPerfectShopInfo from '@/components/perfectShop/OutletPerfectShopInfo.vue';
import StatLevelInput from '@/components/perfectShop/StatLevelInput.vue';

const NAME = 'PerfectShopStatsDialog';

export default {

  name: NAME,
  components: {
    StatLevelInput,
    OutletPerfectShopInfo,
  },

  created() {
    this.visible = true;
    this.$watchImmediate('nextLevel', nextLevel => {
      this.level = nextLevel;
    });
  },

  computed: {

    perfectShop() {
      const { stats } = this.stat || {};
      return stats ? stats.perfectShop : null;
    },

    stat() {
      return svc.perfectShopStatById(this.$route.params.statId);
    },

    levels() {
      return perfectShopLevels();
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

  data() {
    return { level: this.nextLevel };
  },

};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.outlet-perfect-shop-info {
  color: $black;
}

.perfect-shop-stats-dialog {
  ::v-deep .el-dialog__header {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}

h1 {
  flex: 1;
  order: 2;
  text-align: center;
  font-weight: bold;
  margin: 0 $margin-top * 2;
}

.outlet {
  font-size: large;
  order: 1;
  text-align: left;

  .name {
    font-weight: bold;
  }
}

.stm-resize {
  margin-top: $margin-top;
}

</style>

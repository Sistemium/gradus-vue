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

    h1 Показатели Perfect Shop

    .outlet
      outlet-info(:outlet="stat.outlet")
      .salesman
        label ТП
        = ' '
        span {{ salesman.name }}

    print-button.el-dialog__headerbtn(type="text")

  el-form
    el-form-item(label="Уровень акции")
      stat-level-input(v-model="level" :levels="levels")

  resize(v-if="level" :padding="20")
    outlet-perfect-shop-info(:stat="perfectShop.stats[level]")

</template>
<script>

import DialogComponent from '@/lib/DialogComponent';
import PrintButton from '@/lib/PrintButton.vue';
import * as svc from '@/services/territory';
import { perfectShopLevels } from '@/services/perfectShop';
import OutletPerfectShopInfo from '@/components/perfectShop/OutletPerfectShopInfo.vue';
import StatLevelInput from '@/components/perfectShop/StatLevelInput.vue';
import OutletInfo from '@/components/territory/OutletInfo.vue';

const NAME = 'PerfectShopStatsDialog';

export default {

  name: NAME,
  components: {
    PrintButton,
    OutletInfo,
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

    salesman() {
      const { salesmanId } = this.stat || {};
      return svc.salesmanById(salesmanId) || {};
    },

    levels() {
      return perfectShopLevels();
    },

    nextLevel() {
      const { nextLevel, level } = this.perfectShop || {};
      return nextLevel || level;
    },

    title() {
      return this.stat ? 'Детализация Perfect Shop' : 'Загрузка ...';
    },
  },

  methods: {
    onClose() {
      this.closeDialog();
      this.updateRouteParams({}, {}, 'PerfectShop');
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

  @media screen {
    ::v-deep .el-dialog {
      margin: 0 auto;
      max-width: 1024px;
    }
  }

}

h1 {
  flex: 1;
  order: 2;
  text-align: center;
  @media print {
    text-align: right;
    margin-right: 0;
  }
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

  .salesman {
    font-weight: normal;
    font-size: small;
    margin-top: $padding;
  }
}

.stm-resize {
  margin-top: $margin-top;
}

.print-button {
  right: 50px;
  padding: 1px;
}

</style>

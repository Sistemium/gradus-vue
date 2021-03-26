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

</template>
<script>

import DialogComponent from '@/lib/DialogComponent';
import * as svc from '@/services/territory';

const NAME = 'PerfectShopStatsDialog';

export default {

  name: NAME,
  components: {},

  created() {
    this.visible = true;
  },

  computed: {
    stat() {
      return svc.perfectShopStatById(this.$route.params.statId);
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

</style>

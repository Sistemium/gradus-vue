<template lang="pug">

el-dialog.possible-outlet-dialog(
  :title="outlet.name"
  :fullscreen="true"
  :show-close="true"
  :visible.sync="visible"
  custom-class="el-dialog-gallery"
  @closed="onClose()"
  :append-to-body="true"
  center
)

  possible-outlet-gallery(
    :images="outlet.photos"
    @image-click="onClose"
  )

</template>
<script>

import DialogComponent from '@/lib/DialogComponent';
import PossibleOutletGallery from '@/components/territory/PossibleOutletGallery';
import * as svc from '@/services/territory';

const NAME = 'PossibleOutletDialog';

export default {
  name: NAME,
  components: { PossibleOutletGallery },
  created() {
    this.visible = true;
  },
  computed: {
    outlet() {
      return svc.possibleOutletById(this.$route.params.outletId);
    },
  },
  methods: {
    onClose() {
      this.closeDialog();
      this.$router.replace({
        name: 'PossibleOutlets',
        query: this.$route.query,
      });
    },
  },
  mixins: [DialogComponent],
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

</style>

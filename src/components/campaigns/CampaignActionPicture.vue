<template lang="pug">

el-dialog.campaign-action-picture(
  fullscreen
  show-close
  :visible.sync="visible"
  custom-class="el-dialog-gallery"
  @closed="closeDialog()"
  destroy-on-close
  append-to-body
  center
)
  .wrapper
    action-flyer(:action="action" v-if="action")

</template>
<script>

import ActionFlyer from '@/components/actions/ActionFlyer.vue';
import Action from '@/models/Action';

const NAME = 'CampaignActionPicture';

export default {

  name: NAME,

  components: { ActionFlyer },

  data() {
    return {
      visible: true,
    };
  },

  props: {
    actionId: String,
    from: Object,
  },

  computed: {
    action() {
      return Action.reactiveGet(this.actionId);
    },
  },

  methods: {
    closeDialog() {
      this.visible = false;
      this.$router.replace({ ...this.from })
        .catch(e => this.$error('handleClose', e));
    },
  },

};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.action-single-view {
  flex: 1;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.campaign-action-picture /deep/ {
  .el-dialog__body {
    padding: 0;
  }
}

</style>

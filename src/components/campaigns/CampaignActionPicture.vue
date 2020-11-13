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
    action-single-view(:action-id="actionId")

</template>
<script>

import ActionSingleView from '@/views/ActionSingleView.vue';

const NAME = 'CampaignActionPicture';

export default {

  name: NAME,

  components: { ActionSingleView },

  data() {
    return {
      visible: true,
    };
  },

  props: {
    actionId: String,
    from: Object,
  },

  methods: {
    closeDialog() {
      this.visible = false;
      // this.$emit('closed');
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
  //transform: scale(1);
  //transform-origin: top;
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

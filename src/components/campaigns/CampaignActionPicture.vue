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

  .buttons
    download-button(:options="downloadOptions" format="png" :url="printUrl")
    el-link(type="primary" icon="el-icon-printer" @click="printClick") Печатать
    el-link(type="primary" icon="el-icon-close" @click="closeDialog") Закрыть

  .wrapper
    action-flyer(:action="action" v-if="action")

</template>
<script>

import DownloadButton from '@/components/DownloadButton.vue';
import ActionFlyer from '@/components/actions/ActionFlyer.vue';
import Action from '@/models/Action';

const NAME = 'CampaignActionPicture';

export default {

  name: NAME,

  components: {
    ActionFlyer,
    DownloadButton,
  },

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
    downloadOptions() {
      return {
        name: this.fileName,
        width: '960',
        height: '700',
        media: 'print',
        scale: '1',
        background: 'true',
      };
    },
    action() {
      return Action.reactiveGet(this.actionId);
    },
    fileName() {
      return this.action && this.action.name;
    },
    printUrl() {
      const { host, protocol } = window.location;
      return `${protocol}//${host}/#/actionSingle/${this.actionId}`;
    },
  },

  methods: {
    printClick() {
      window.print();
    },
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

@media print {
  .campaign-action-picture {
    .buttons, ::v-deep .el-dialog__header {
      display: none;
    }
  }
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 700px;
  box-sizing: border-box;
  position: relative;
}

.campaign-action-picture ::v-deep {
  .el-dialog__body {
    padding: 0 $margin;
    @media print {
      padding: 0;
    }
  }
}

.action-flyer {
  max-width: 1000px;
  width: 980px;
  position: absolute;
  top: 0;
  min-height: 700px;
  @media print {
    max-width: 100%;
  }
}

.buttons {
  text-align: center;
  margin: -$margin-top auto $margin-top;

  > * + * {
    margin-left: $margin;
  }
}

</style>

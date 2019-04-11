<template lang="pug">

el-dialog(
:title="campaign.name"
:fullscreen="true"
:show-close="true"
:visible.sync="visible"
custom-class="el-dialog-gallery"
@closed="closeDialog()"
:append-to-body="true"
center
)
  campaigns-picture-gallery(
  v-loading="busy"
  element-loading-text="Обработка изображения ..."
  @image-click="closeDialog"
  :model="this.pictureModel"
  :new-image-properties="newImageProperties"
  @uploaded="onUpload"
  )

</template>
<script>

// import pick from 'lodash/pick';

import { createNamespacedHelpers } from 'vuex';
import * as a from '@/vuex/campaigns/actions';

import log from 'sistemium-telegram/services/log';

import CampaignPicture from '@/models/CampaignPicture';

import CampaignsPictureGallery from './CampaignsPictureGallery';

const { debug, error } = log('CampaignPicturesDialog');
const vuex = createNamespacedHelpers('campaigns');

export default {

  name: 'CampaignPicturesDialog',

  props: {
    campaign: Object,
  },

  data() {
    return {
      busy: false,
      image: undefined,
      visible: true,
      pictureModel: CampaignPicture,
    };
  },

  computed: {
    newImageProperties() {
      return { campaignId: this.campaign.id };
    },
  },

  methods: {

    ...vuex.mapActions({
      addPicture: a.ADD_GALLERY_PICTURE,
    }),

    closeDialog() {
      this.visible = false;
      this.$emit('closed');
    },

    async onUpload(picture, fileName) {

      const { id: campaignId } = this.campaign;

      debug('onUpload', picture, campaignId, fileName);

      this.busy = true;

      try {

        await this.addPicture(picture);

      } catch (e) {
        error(e);
      }

      this.busy = false;

    },

  },

  components: {
    CampaignsPictureGallery,
  },

};

</script>

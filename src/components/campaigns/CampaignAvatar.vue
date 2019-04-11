<template lang="pug">

img.placeholder(:src="avatarPicture()")

</template>

<script>

// import log from 'sistemium-telegram/services/log';
import CampaignPicture from '@/models/CampaignPicture';

// const { debug } = log('CampaignAvatar');

export default {

  name: 'CampaignAvatar',

  props: {
    campaign: Object,
  },

  methods: {
    avatarPicture() {
      const { pictures } = this.campaign;
      // debug(pictures.length);
      return pictures.length ? pictures[0].thumbnailSrc : '/images/placeholder.png';
    },
  },

  created() {
    CampaignPicture.bind(this);
  },

  beforeDestroy() {
    CampaignPicture.unbindAll(this);
  },

};

</script>

<style scoped>

</style>

<template lang="pug">

.take-photo-button

  vue-core-image-upload.browser(
    :crop="false"
    ref="uploadComponent"
    @imageuploading="$emit('imageuploading')"
    @imageuploaded="imageUploaded"
    @imagechanged="imageChanged"
    @errorhandle="onError"
    :multiple="false"
    :data="imageData"
    :max-file-size="maxFileSize"
    :headers="uploadHeaders"
    :url="imsUrl()"
  )
    slot
      el-button.trigger(plain type="primary") {{ buttonText }}

</template>
<script>

import { mapState } from 'vuex';
// eslint-disable-next-line
import VueCoreImageUpload from 'vue-core-image-upload';

import { serverDateFormat } from 'sistemium-telegram/services/moments';
import log from 'sistemium-telegram/services/log';
// import { isNative, takePhoto } from '@/services/native';

const NAME = 'TakePhotoButton';
const { debug } = log(NAME);

export default {

  name: NAME,

  props: {
    entityName: String,
    buttonText: {
      type: String,
      default: 'Добавить фото',
    },
    maxFileSize: {
      type: Number,
      default: 1024 * 1024 * 20,
    },
  },

  components: { VueCoreImageUpload },

  data() {
    return {
      imageData: null,
      fileName: null,
    };
  },

  computed: {
    ...mapState('auth', {
      token: 'id',
      org(auth) {
        return (auth && auth.account) ? auth.account.org : null;
      },
    }),
    // isNative,
    uploadHeaders() {
      return { authorization: this.token };
    },
  },

  methods: {

    imageChanged(file) {
      debug('imageChanged', file);
      this.fileName = file.name;
    },

    imsUrl() {
      return `/ims/${this.org}?folder=${this.entityName}/${serverDateFormat()}`;
    },

    // nativeTriggerClick() {
    //   takePhoto(this.entityName, {})
    //     .then(this.done);
    // },

    imageUploaded(res) {
      debug('imageUploaded', res);
      const { pictures: picturesInfo } = res;
      if (!picturesInfo) {
        this.$emit('error', res);
        return;
      }
      this.$emit('done', picturesInfo, this.fileName);
    },

    onError(params) {
      this.$emit('error', params);
    },

  },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.trigger {
  border: solid 1px $gray-border-color;
  border-radius: 4px;
  box-shadow: none;
  width: 100%;
}

</style>

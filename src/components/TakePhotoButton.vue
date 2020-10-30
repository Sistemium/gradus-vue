<template lang="pug">

.take-photo-button
  vue-dropzone(
    ref="dz"
    id="take-photo-button-drop-zone"
    :options="dzOptions"
    :destroy-dropzone="true"
    :useCustomSlot="true"
    :include-styling="false"
    @vdropzone-success="onDropzoneSuccess"
    @vdropzone-total-upload-progress="uploadProgress"
    @vdropzone-error="onError"
  )
    slot
      el-badge.countdown(:value="countdown" :hidden="!isUploading")
        el-button.trigger(
          plain type="primary"
          :disabled="isUploading"
          :size="size"
        ) {{ currentButtonText }}

</template>
<script>

import filter from 'lodash/filter';
import { mapState } from 'vuex';
import VueDropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

import { addMonths } from '@/lib/dates';
import log from 'sistemium-debug';
// import { isNative, takePhoto } from '@/services/native';

const NAME = 'TakePhotoButton';
const { debug } = log(NAME);

export default {

  name: NAME,

  props: {
    allowMultiple: {
      type: Boolean,
      default: true,
    },
    entityName: String,
    buttonText: {
      type: String,
      default: 'Добавить фото',
    },
    size: {
      type: String,
      default: 'medium',
    },
    maxFileSize: {
      type: Number,
      default: 1024 * 1024 * 20,
    },
    trim: {
      type: Boolean,
      default: false,
    },
  },

  components: { VueDropzone },

  data() {
    return {
      countdown: 0,
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
    currentButtonText() {
      return this.isUploading ? 'Загрузка ...' : this.buttonText;
    },
    dzOptions() {
      return {
        url: this.imsUrl(),
        maxFiles: this.allowMultiple ? null : 1,
        thumbnailWidth: 150,
        acceptedFiles: 'image/png,image/jpeg',
        headers: this.uploadHeaders,
        createImageThumbnails: false,
      };
    },
    isUploading() {
      return !!this.countdown;
    },
  },

  methods: {

    unprocessedCount() {
      const { dz } = this.$refs;
      return dz && (dz.getUploadingFiles().length + dz.getQueuedFiles().length);
    },

    onDropzoneSuccess(file, response) {
      this.imageUploaded(response, file.name);
      this.$refs.dz.removeFile(file);
    },

    imsUrl() {
      const url = [
        `/ims/${this.org}?folder=${this.entityName}/${addMonths(new Date(), 0)}`,
        this.trim && 'trim=true',
      ];
      return filter(url)
        .join('&');
    },

    // nativeTriggerClick() {
    //   takePhoto(this.entityName, {})
    //     .then(this.done);
    // },

    uploadProgress(totalUploadProgress, totalBytes, totalBytesSent) {
      this.countdown = this.unprocessedCount();
      debug(totalUploadProgress, totalBytes, totalBytesSent);
    },

    imageUploaded(res, fileName) {
      // debug('imageUploaded', fileName, res);
      const { pictures: picturesInfo } = res;
      if (!picturesInfo) {
        this.$emit('error', res);
        return;
      }
      this.$emit('done', picturesInfo, fileName);
    },

    onError(files, message) {
      this.$refs.dz.removeAllFiles();
      this.$emit('error', message);
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

.take-photo-button /deep/ .dz-preview {
  display: none;
}


</style>

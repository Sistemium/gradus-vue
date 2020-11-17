<template lang="pug">

el-link.download-button(:href="href" icon="el-icon-download" type="primary") Скачать

</template>
<script>

import map from 'lodash/map';
import { createNamespacedHelpers } from 'vuex';

const { mapState } = createNamespacedHelpers('auth');
const NAME = 'DownloadButton';
const { VUE_APP_REPORTS } = process.env;

export default {
  name: NAME,
  props: {
    format: {
      type: String,
      default: 'pdf',
    },
    auth: {
      type: Boolean,
      default: true,
    },
    url: {
      type: String,
      default: window.location.href,
    },
    options: Object,
  },
  computed: {
    ...mapState({ accessToken: 'id' }),
    href() {
      let { url } = this;
      if (this.auth) {
        url += `&access-token=${this.accessToken}`;
      }
      const params = {
        url,
        ...(this.options || {}),
      };
      const query = map(params, (val, key) => `${key}=${encodeURIComponent(val)}`);
      return `${VUE_APP_REPORTS}/${this.format}?${query.join('&')}`;
    },
  },
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

</style>

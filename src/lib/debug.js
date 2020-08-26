import Vue from 'vue';

import log from 'sistemium-telegram/services/log';

Vue.mixin({

  computed: {
    $log() {
      return log(this.name);
    },
  },

  methods: {
    $debug(...args) {
      return this.$log.debug(...args);
    },
    $error(...args) {
      return this.$log.error(...args);
    },
  },

});

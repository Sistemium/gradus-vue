import matches from 'lodash/matches';
import Vue from 'vue';

Vue.mixin({
  methods: {
    async updateRouteParams(updateParams) {
      const { name, params = {} } = this.$route;
      if (matches(updateParams)(params)) {
        return;
      }
      await this.$router.push({
        name,
        params: {
          ...params,
          ...updateParams,
        },
      });
    },
  },
});

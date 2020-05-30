import matches from 'lodash/matches';
import Vue from 'vue';

Vue.mixin({
  methods: {
    async updateRouteParams(updateParams = {}, updateQuery = {}) {
      const { name, params = {}, query } = this.$route;
      if (matches(updateParams)(params) && matches(updateQuery)(query)) {
        return;
      }
      await this.$router.push({
        name,
        params: {
          ...params,
          ...updateParams,
        },
        query: {
          ...query,
          ...updateQuery,
        },
      });
    },
  },
});

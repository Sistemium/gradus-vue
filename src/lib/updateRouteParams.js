import matches from 'lodash/matches';
import Vue from 'vue';

Vue.mixin({
  methods: {
    async updateRouteParams(updateParams = {}, updateQuery = {}, updateName) {
      const { name, params = {}, query } = this.$route;
      if (matches(updateParams)(params) && matches(updateQuery)(query) && !updateName) {
        return;
      }
      await this.$router.push({
        name: updateName || name,
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

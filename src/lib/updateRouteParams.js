import matches from 'lodash/matches';
import Vue from 'vue';

Vue.mixin({
  methods: {
    async updateRouteParams(updateParams = {}, updateQuery = {}, updateName) {

      const { name, params = {}, query = {} } = this.$route;

      const newParams = {
        ...params,
        ...updateParams,
      };

      const newQuery = {
        ...query,
        ...updateQuery,
      };

      const newName = updateName || name;

      const sameState = matches(newParams)(params)
        && matches(newQuery)(query)
        && newName === name;

      if (sameState) {
        return;
      }

      // this.$debug('route:', name, params, query);
      // this.$debug('update:', updateName, updateParams, updateQuery);

      await this.$router.push({
        name: newName,
        params: newParams,
        query: newQuery,
      });

    },
  },
});

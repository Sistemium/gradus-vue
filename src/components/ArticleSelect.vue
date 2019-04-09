<template lang="pug">

v-select.article-select(
:value="value"
@input="onSelect"
label="name"
:filterable="false"
:options="options"
@search="onSearch"
ref="select"
)

  template(slot="no-options") напишите часть названия, чтобы начать поиск

  template(slot="option" slot-scope="option")
    .name {{ option.name }}

  template(slot="selected-option" slot-scope="option")
    .name {{ option.name }}

</template>
<script>

import debounce from 'lodash/debounce';
import Article from '@/models/Article';

export default {

  name: 'ArticleSelect',

  data() {
    return {
      options: [],
      article: null,
    };
  },

  props: {
    value: Object,
  },

  methods: {

    clear() {
      // this.setOptions([]);
      this.$refs.select.clearSelection();
    },

    onSelect(item) {
      this.$emit('input', item);
    },

    onSearch(search, loading) {
      loading(true);
      this.search(loading, search, this);
    },

    search: debounce(async (loading, search, vm) => {
      // vm.setOptions([{ name: 'test' }, { name: search }]);
      const where = {
        name: { likei: `%${search}%` },
      };
      const articles = await Article.findAll({ where, limit: 50 });
      vm.setOptions(articles);
      loading(false);
    }, 500),

    setOptions(options) {
      this.options = options;
    },

  },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.article-select {
  /*overflow-y: auto;*/
}


</style>

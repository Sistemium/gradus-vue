<template lang="pug">

el-container.catalogue
  el-aside.filters
    catalogue-group-list(
    :items="articleGroups"
    :parents="currentArticleGroupParents"
    v-model="currentArticleGroup"
    )
  el-main

</template>
<script>

import ArticleGroup from '@/models/ArticleGroup';

import CatalogueGroupList from '@/components/CatalogueGroupList.vue';

export default {

  name: 'Catalogue',

  data() {
    return {
      articleGroups: [],
      currentArticleGroup: null,
      currentArticleGroupParents: [],
    };
  },

  computed: {},

  async created() {
    this.$watch('currentArticleGroup', this.bindCurrent, { immediate: true });
    await ArticleGroup.findAll({ limit: 10000 });
  },

  methods: {
    bindCurrent() {
      const { id: articleGroupId = null } = this.currentArticleGroup || {};
      const filter = {
        articleGroupId,
        orderBy: 'name',
      };
      ArticleGroup.bindAll(this, filter, 'articleGroups');
      if (articleGroupId) {
        this.currentArticleGroupParents = [
          ...this.currentArticleGroup.parents(),
          this.currentArticleGroup,
        ];
      } else {
        this.currentArticleGroupParents = [];
      }
    },
  },

  components: { CatalogueGroupList },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

</style>

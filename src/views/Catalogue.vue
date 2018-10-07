<template lang="pug">

.catalogue
  h1 Not implemented

</template>
<script>

import ArticleGroup from '@/models/ArticleGroup';

export default {
  name: 'Catalogue',
  data() {
    return { articleGroups: [] };
  },
  async created() {
    ArticleGroup.bindAll(this, {}, 'articleGroups');
    await ArticleGroup.findAll({ limit: 10000 });
  },
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

</style>

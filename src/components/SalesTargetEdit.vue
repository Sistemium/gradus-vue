<template lang="pug">

.sales-target-edit

  .field
    label Цель СКЮ:
    el-input-number(v-model="cnt" :min="1" size="small" :step="1" @change="onCnt")

  .list-group(v-if="articles.length")
    .list-group-item(v-for="article in articles") {{ article.name }}

  article-select(ref="newArticle" @input="onNewArticle")

</template>
<script>

import ArticleSelect from '@/components/ArticleSelect.vue';

export default {

  name: 'SalesTargetEdit',
  components: { ArticleSelect },

  props: {
    target: Object,
  },

  data() {
    const { cnt, articleIds = [], articles } = this.target || {};
    return {
      cnt,
      articleIds,
      articles: [...(articles ? articles.call(this.target) : [])],
      // newArticle: null,
    };
  },

  methods: {
    onCnt(newValue) {
      this.target.cnt = newValue;
    },
    onNewArticle(article) {
      if (article) {
        this.articles.push(article);
        // this.newArticle = null;
        this.$refs.newArticle.clear();
      }
    },
  },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.field {
  text-align: right;
  margin: $margin-right 0;
}

label {
  margin-right: $margin-top;
}

.article-select {
  margin-top: $margin-right;
}

</style>

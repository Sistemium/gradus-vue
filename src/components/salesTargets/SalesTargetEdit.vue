<template lang="pug">

.sales-target-edit

  .field
    label Цель СКЮ:
    el-input-number(
    v-model="cnt"
    :min="1"
    :max="articles.length || 1"
    size="small"
    @change="onCnt"
    )

  .list-group(v-if="articles.length")
    .list-group-item(v-for="article in articles")
      .article
        .name {{ article.name }}
        .extra-label(v-if="article.extraLabel") {{ article.extraLabel }}
      confirm-button.del(@confirm="delArticleClick(article)" text="Удалить" type="text")

  article-select(ref="newArticle" @input="onNewArticle" placeholder="Добавить товар")

</template>
<script>

import log from 'sistemium-telegram/services/log';
import map from 'lodash/map';
import pull from 'lodash/pull';

import ArticleSelect from '@/components/ArticleSelect.vue';
import SalesTarget from '@/models/SalesTarget';

const name = 'SalesTargetEdit';
const { error } = log(name);

export default {

  name,
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
      this.save();
    },

    onNewArticle(article) {
      if (!article) {
        return;
      }

      this.$refs.newArticle.clear();

      if (this.target.articleIds.indexOf(article.id) >= 0) {
        return;
      }

      this.articles.push(article);
      this.target.articleIds = map(this.articles, 'id');
      this.save();
    },

    save() {
      this.target.articleIds = map(this.articles, 'id');
      SalesTarget.safeSave(this.target)
        .catch(error);
    },

    delArticleClick(article) {
      this.articles = [...pull(this.articles, article)];
      this.save();
    },

  },

};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

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

.del {
  margin-left: $margin-right;
  visibility: hidden;
}

.list-group-item:hover .del {
  visibility: visible;
}

.list-group-item {
  display: flex;
  justify-content: space-between;
}

.list-group-item /deep/ button {
  padding: 0;

  &.confirmation {
    padding: 4px;
  }
}

.article {

  > * {
    display: inline;
  }

  .extra-label {
    margin-left: $margin-right;
    color: $gray;
  }
}

</style>

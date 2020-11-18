<template lang="pug">

.sales-target-edit

  el-form.fields(
  ref="form"
  :model="target"
  :rules="rules"
  )

    el-form-item(label="Название" prop="name")
      el-input(v-model="target.name")

    el-form-item(label="Цель СКЮ")
      el-input-number(
      v-model="target.cnt"
      :min="1"
      :max="articles.length || 1"
      size="small"
      )

  article-select(ref="newArticle" @input="onNewArticle" placeholder="Добавить товар")

  .list-group(v-if="articles.length")
    .list-group-item(v-for="article in articles")
      .article
        .name {{ article.name }}
        .extra-label(v-if="article.extraLabel") {{ article.extraLabel }}
      confirm-button.del(@confirm="delArticleClick(article)" text="Удалить" type="text")

</template>
<script>

import map from 'lodash/map';
import pull from 'lodash/pull';

import ArticleSelect from '@/components/ArticleSelect.vue';
// import SalesTarget from '@/models/SalesTarget';

const NAME = 'SalesTargetEdit';

const rules = {
  name: [
    {
      required: true,
      message: 'Укажите название',
      trigger: 'change',
    },
  ],
};

/**
 * @property {String} target.name
 * @property {Array} target.articleIds
 * @property {Number} target.cnt
 */

export default {

  name: NAME,
  components: { ArticleSelect },

  props: {
    target: Object,
  },

  data() {
    const { articles } = this.target || {};
    return {
      articles: [...(articles ? articles.call(this.target) : [])],
      rules,
    };
  },

  methods: {

    onNewArticle(article) {
      if (!article) {
        return;
      }

      this.$refs.newArticle.clear();

      if (this.target.articleIds.indexOf(article.id) >= 0) {
        return;
      }

      this.articles.push(article);
    },

    delArticleClick(article) {
      this.articles = [...pull(this.articles, article)];
    },

    validate(cb) {
      this.target.articleIds = map(this.articles, 'id');
      return this.$refs.form.validate(cb);
    },

  },

};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.fields {
  display: flex;

  > *:first-child {
    flex: 1;
    margin-right: $margin-top;
  }

}

.field {
  text-align: right;
  margin: $margin-right 0;
  display: flex;
  align-items: center;
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

.list-group-item ::v-deep button {
  padding: 0;

  &.confirmation {
    padding: 4px;
  }
}

.article-select {
  margin-bottom: $margin-top;
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

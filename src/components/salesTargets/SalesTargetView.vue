<template lang="pug">

.sales-target-view

  .fields
    h3 {{ target.name || '⚠️ Название не задано' }}
    .field
      label Цель СКЮ:
      strong {{ target.cnt }}

  .list-group(v-if="articles.length")
    .list-group-item(v-for="article in articles")
      .article
        .name {{ article.name }}
        .extra-label(v-if="article.extraLabel") {{ article.extraLabel }}

</template>
<script>

export default {

  name: 'SalesTargetView',

  props: {
    target: Object,
  },

  computed: {
    articles() {
      return this.target.articles();
    },
  },

};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.fields {

  display: flex;
  align-items: center;
  min-height: 28px;

  h3 {
    margin: 0 $margin-right;
  }

  margin: $margin-right 0;

}

.field {
  margin-left: $margin-right;
  font-size: 85%;
  label + * {
    margin-left: $margin-right;
  }
}

</style>

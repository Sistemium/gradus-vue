<template lang="pug">

resize.list-group.catalogue-article-list(v-if="items.length" padding="35" ref="resizer")

  dynamic-scroller.scroller(
    :items="groupedItems()"
    :min-item-height="80"
    :pageMode="true"
  )

    template(slot-scope='{ item, index, active }')

      dynamic-scroller-item(
        :item='item',
        :active='active',
        :size-dependencies="[item.message]"
        :data-index='index'
      )

        catalogue-article.list-group-item(
        :class="{'first-item': index===0}"
        :key="item.id"
        :article="item"
        @avatar-click="$emit('avatar-click', item)"
        )

</template>
<script>

import Vue from 'vue';
import VueVirtualScroller from 'vue-virtual-scroller';

import Article from '@/models/Article';

import { groupedArticles } from '@/services/catalogue';

import CatalogueArticle from './CatalogueArticle.vue';

Vue.use(VueVirtualScroller);

export default {

  name: 'CatalogueArticleList',

  props: {
    items: Array,
  },

  methods: {
    groupedItems() {
      return groupedArticles(this.items);
    },
  },

  created() {
    Article.bind(this);
  },

  beforeDestroy() {
    Article.unbindAll(this);
  },

  components: {
    CatalogueArticle,
  },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.list-group-item {
  display: flex;
  padding: $margin-right;
  box-sizing: border-box
}

.catalogue-article {

  border-top: $list-cell-borders;

}

.first-item{
  border-top: none
}

</style>

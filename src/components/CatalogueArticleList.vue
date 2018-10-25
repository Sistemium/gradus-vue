<template lang="pug">

resize.list-group.catalogue-article-list(v-if="items.length" padding="35" ref="resizer")

  dynamic-scroller.scroller(
  :items="groupedItems()"
  :min-item-height="68"
  :page-mode="true"
  )

    template(slot-scope='{ item, index, active }')
      dynamic-scroller-item(
      :item="item"
      :active="active"
      :size-dependencies="[item.name]"
      :data-index="index"
      )

        catalogue-article.list-group-item(
        :key="item.id"
        :article="item"
        @avatar-click="$emit('avatar-click', item)"
        )

</template>
<script>
import Vue from 'vue';
import VueVirtualScroller from 'vue-virtual-scroller';

import Article from '@/models/Article';
import log from 'sistemium-telegram/services/log';

import { groupedArticles } from '@/services/catalogue';

import CatalogueArticle from './CatalogueArticle.vue';

Vue.use(VueVirtualScroller);

const { debug } = log('CatalogueArticleList');

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

  watch: {
    items(items) {
      debug(items.length);
      this.$nextTick(() => {
        this.$refs.resizer.$el.scrollTop = 0;
      });
    },
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
}

.scroller {
  height: 100%;
}

</style>

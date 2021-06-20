<template lang="pug">

.comments-edit

  .comments(v-if="comments.length")
    .comment(v-for="comment in comments" :key="comment.text")
      a(@click.prevent="removeClick(comment)")
        i.el-icon-circle-close
      .text(v-html="comment.text")

  el-autocomplete(
    :fetch-suggestions="suggestions"
    placeholder="найти или добавить условие"
    v-model="search"
    @select="onSelect"
    :size="size"
    value-key="text"
    prefix-icon="el-icon-search"
  )
    template(slot="append")
      el-button(@click="addClick" icon="el-icon-circle-plus-outline" :disabled="!search")
    template(slot-scope="{ item }")
      .item(v-html="item.text")


</template>
<script>

import escapeRegExp from 'lodash/escapeRegExp';
import map from 'lodash/map';
import find from 'lodash/find';
import groupBy from 'lodash/groupBy';
import filter from 'lodash/filter';
import orderBy from 'lodash/orderBy';
import remove from 'lodash/without';
import flatten from 'lodash/flattenDeep';
import { createNamespacedHelpers } from 'vuex';
import * as getters from '@/vuex/campaigns/getters';

const { mapGetters } = createNamespacedHelpers('campaigns');

export default {
  name: 'CommentsEdit',
  props: {
    value: Array,
    size: String,
  },
  data() {
    return {
      search: '',
      // message: null,
      comments: this.value || [],
    };
  },
  computed: {
    ...mapGetters({
      campaigns: getters.CAMPAIGNS,
    }),
    allCampaignComments() {
      return orderBy(allComments(this.campaigns), ['num', 'text'], ['desc']);
    },
  },
  methods: {
    suggestions(search, cb) {
      const { allCampaignComments } = this;
      const re = search && new RegExp(escapeRegExp(search), 'i');
      const res = allCampaignComments.filter(this.filter(re));
      cb(res);
    },
    removeClick(comment) {
      this.$debug(comment);
      this.comments = remove(this.comments, comment);
      this.$emit('input', this.comments);
    },
    onSelect(item) {
      this.search = '';
      this.$emit('select', { ...item });
      this.comments.push(item);
      this.$emit('input', this.comments);
    },
    filter(re) {
      return ({ text }) => text
        && (!re || (text && re.test(text)))
        && !find(this.comments, c => text === c.text);
    },
    addClick() {
      const item = { text: this.search };
      this.onSelect(item);
      this.search = '';
    },
  },
};


function allComments(campaigns) {

  if (!campaigns || !campaigns.length) {
    return [];
  }

  const pre = map(campaigns, campaign => {
    const {
      actions,
      commentText,
      comments,
    } = campaign;

    return filter([
      commentText,
      ...map(comments, 'text'),
      ...map(allComments(actions), 'text'),
    ]);

  });

  const grouped = groupBy(flatten(pre));

  return map(grouped, (usages, text) => ({
    text,
    num: usages.length,
  }));

}

</script>
<style scoped lang="scss">

@import "../styles/variables";

.el-autocomplete {
  width: 100%;
}

.comment {
  //white-space: pre-line;
  margin: $padding 0;
  display: flex;
}

.comments-edit {
  clear: both;
}

.comments {
  margin-bottom: $margin-top;
}

i {
  color: $gray-border-color;
  margin-right: $padding;
  cursor: pointer;
}

</style>

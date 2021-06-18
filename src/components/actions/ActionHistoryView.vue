<template lang="pug">

.action-history-view(v-if="sortedHistory.length")
  .title
    span История изменений
  .action-history(v-for="entry in sortedHistory" :key="entry.id" :class="entry.style")
    .cts() {{ entry.cts | ruDateTime }}
    i(v-if="entry.style" :class="`el-icon-${entry.style}`")
    .comment() {{ entry.commentText || 'Незначительные изменения' }}

</template>
<script>

import orderBy from 'lodash/orderBy';
import filter from 'lodash/filter';

const NAME = 'ActionHistoryView';

export default {
  name: NAME,
  props: {
    history: Array,
  },
  computed: {
    sortedHistory() {
      return orderBy(filter(this.history, 'commentText'), ['cts'], ['desc']);
    },
  },
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.comment {
  white-space: pre-line;
}

.action-history-view {
  border: $list-cell-borders;
}

.action-history {
  padding: $padding;
  display: flex;
  align-items: center;

  &.info i {
    color: $green;
  }

  &.warning i {
    color: $red;
  }

  i {
    margin-right: $padding;
  }

  i + .comment {
    //font-weight: 500;
  }

  .cts {
    min-width: 140px;
  }
}

.title {
  span {
    background: $light-gray;
    color: white;
    padding: 2px $padding;
    border-bottom-right-radius: $border-radius;
    margin-left: -1px;
  }
}

</style>

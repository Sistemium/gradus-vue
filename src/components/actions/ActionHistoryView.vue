<template lang="pug">

.action-history-view(v-if="history.length")
  .title
    span История изменений
  .action-history(v-for="entry in sortedHistory" :key="entry.id")
    .cts() {{ entry.cts | ruDateTime }}
    .comment() {{ entry.commentText || 'Незначительные изменения' }}

</template>
<script>

import orderBy from 'lodash/orderBy';

const NAME = 'ActionHistoryView';

export default {
  name: NAME,
  props: {
    history: Array,
  },
  computed: {
    sortedHistory() {
      return orderBy(this.history, ['cts'], ['desc']);
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

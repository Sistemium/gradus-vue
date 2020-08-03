<template lang="pug">

.action-history-view(v-if="history.length")
  .action-history(v-for="entry in history" :key="entry.id")
    .cts() {{ entry.cts | ruDateTime }}
    .comment() {{ entry.commentText }}

</template>
<script>

const NAME = 'ActionHistoryView';

export default {
  name: NAME,
  props: {
    history: Array,
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

</style>

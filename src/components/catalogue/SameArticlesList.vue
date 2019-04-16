<template lang="pug">

.same-articles
  .same-article(v-for="same in sameArticles" :key="same.id")
    span.remove-same(@click.prevent.stop="$emit('remove-click', same)") ❌
    span {{ same.name }}
    span.package-rel x {{ same.packageRel }}
    span.extra-label {{ same.extraLabel }}

</template>
<script>

import { mapGetters } from 'vuex';
import { SAME_ARTICLES } from '@/vuex/catalogue/getters';

export default {
  name: 'SameArticlesList',
  computed: mapGetters('catalogue', { sameArticles: SAME_ARTICLES }),
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.same-article {

  font-size: 75%;
  margin-top: $margin-top/3;

  .remove-same {

    padding: 6px 6px 6px 8px;

    &:hover {
      //font-weight: bold;
      background-color: $white;
      border-radius: $border-radius;
    }
    color: $red;
  }

  > * + * {
    margin-left: $margin-right;
  }

  .extra-label, .package-rel {
    color: $gray;
  }

}

</style>

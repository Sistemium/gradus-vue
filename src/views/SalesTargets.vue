<template lang="pug">

.sales-targets

  el-container(
  v-loading="loading"
  element-loading-text="Загрузка данных ..."
  )

    el-aside(v-if="!loading")
      resize(padding="30")
        sales-target-group-list(
        :items="targetGroups"
        v-model="currentGroup"
        )

    el-main(v-if="!loading")
      sales-target-edit

</template>
<script>

import SalesTargetEdit from '@/components/SalesTargetEdit.vue';
import SalesTargetGroupList from '@/components/SalesTargetGroupList.vue';

import SalesTargetGroup from '@/models/SalesTargetGroup';
import SalesTarget from '@/models/SalesTarget';

export default {

  name: 'SalesTargets',

  data() {
    return {
      loading: false,
      currentGroup: null,
      targetGroups: [],
    };
  },

  async created() {

    this.loading = true;
    await SalesTargetGroup.findAll({}, { with: ['ArticleGroup'] });
    await SalesTarget.findAll({});
    this.loading = false;

    SalesTargetGroup.bindAll(this, {}, 'targetGroups');

    // this.$watch('currentArticleGroup', this.bindCurrent);
    // this.$watch('searchText', this.bindArticles, { immediate: true });
    // this.$watch('onlyNoAvatar', this.bindCurrent);

  },

  components: {
    SalesTargetEdit,
    SalesTargetGroupList,
  },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

</style>

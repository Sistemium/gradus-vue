<template lang="pug">

.sales-targets

  el-container(
  v-loading="loading"
  element-loading-text="Загрузка данных ..."
  )

    el-aside(v-if="!loading")

      sales-target-group-list(
      :items="salesTargetGroups"
      v-model="currentGroup"
      )

    el-main(v-if="!loading")
      sales-target-edit

</template>
<script>

import SalesTargetEdit from '@/components/SalesTargetEdit.vue';
import SalesTargetGroupList from '@/components/SalesTargetGroupList.vue';

export default {

  name: 'SalesTargets',

  data() {
    return {
      loading: false,
      currentGroup: null,
      salesTargetGroups: [],
    };
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

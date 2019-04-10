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
      sales-target-group-edit(
      v-if="currentGroup"
      v-model="currentGroup"
      )

</template>
<script>

import SalesTargetGroupEdit from '@/components/SalesTargetGroupEdit.vue';
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

  watch: {
    currentGroup(group) {
      const { name } = this.$route;
      if (group) {
        this.$router.replace({
          name,
          params: { groupId: group.id },
        });
      } else {
        this.$router.replace({ name });
      }
    },
  },

  async created() {

    this.loading = true;

    await SalesTargetGroup.findAll({}, { with: ['ArticleGroup'] });
    const targets = await SalesTarget.findAll({});
    await Promise.all(targets.map(target => target.loadArticles()));

    this.loading = false;

    SalesTargetGroup.bindAll(this, {}, 'targetGroups');

    const { groupId } = this.$route.params;

    if (groupId) {
      this.currentGroup = SalesTargetGroup.get(groupId);
    }

  },

  components: {
    SalesTargetGroupEdit,
    SalesTargetGroupList,
  },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.el-main {
  padding: 0;
  margin-left: $margin-top;
}

</style>

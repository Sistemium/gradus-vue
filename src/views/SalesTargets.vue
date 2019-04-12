<template lang="pug">

.sales-targets

  el-container(
  v-loading="loading"
  element-loading-text="Загрузка данных ..."
  )

    el-aside(v-if="!loading && targetGroups.length")
      resize(:padding="30")
        sales-target-group-list(
        :items="targetGroups"
        v-model="currentGroup"
        @add="addTargetGroup"
        )

    el-main()
      sales-target-group-edit(
      v-if="currentGroup"
      v-model="currentGroup"
      @edit-click="editTargetGroup"
      )
      .no-current-group(v-else)
        el-button(
        v-if="!loading"
        @click="addTargetGroup()" type="primary"
        ) Добавить группу целей

  sales-target-group-dialog(
  v-if="newTargetGroup"
  :sales-target-group="newTargetGroup"
  @closed="onDialogClose"
  )

</template>
<script>

import find from 'lodash/find';

import SalesTargetGroupEdit from '@/components/salesTargets/SalesTargetGroupEdit.vue';
import SalesTargetGroupList from '@/components/salesTargets/SalesTargetGroupList.vue';

import SalesTargetGroup from '@/models/SalesTargetGroup';
import SalesTarget from '@/models/SalesTarget';
import ArticleGroup from '@/models/ArticleGroup';

import SalesTargetGroupDialog from '@/components/salesTargets/SalesTargetGroupDialog.vue';

export default {

  name: 'SalesTargets',

  data() {
    return {
      loading: false,
      currentGroup: null,
      targetGroups: [],
      newTargetGroup: null,
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

  methods: {

    editTargetGroup() {
      const { articleGroupId } = this.currentGroup;
      this.newTargetGroup = {
        ...this.currentGroup,
        articleGroupId,
      };
    },

    addTargetGroup(toArticleGroup) {
      const { id: articleGroupId } = toArticleGroup || {};
      this.newTargetGroup = {
        articleGroupId,
        ord: 1,
      };
    },

    onDialogClose(res) {
      if (res) {
        this.currentGroup = res;
      }
      this.newTargetGroup = null;
    },

  },

  async created() {

    this.loading = true;

    await ArticleGroup.findAll({
      articleGroupId: '',
    }, { force: true });

    await SalesTargetGroup.findAll({}, {
      with: ['ArticleGroup'],
      force: true,
    });

    const targets = await SalesTarget.findAll({}, { force: true });
    await Promise.all(targets.map(target => target.loadArticles()));

    this.loading = false;

    SalesTargetGroup.bindAll(this, {}, 'targetGroups', groups => {
      if (this.currentGroup && !find(groups, { id: this.currentGroup.id })) {
        this.currentGroup = null;
      }
    });

    const { groupId } = this.$route.params;

    if (groupId) {
      this.currentGroup = SalesTargetGroup.get(groupId);
    }

  },

  components: {
    SalesTargetGroupEdit,
    SalesTargetGroupList,
    SalesTargetGroupDialog,
  },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.el-main {
  padding: 0;
  margin-left: $margin-top;
}

.no-current-group {
  text-align: center;
  margin-top: 100px;
}

</style>

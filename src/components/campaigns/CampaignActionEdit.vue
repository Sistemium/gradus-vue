<template lang="pug">

el-drawer(
  :title="modelOrigin.name"
  :before-close="handleClose"
  :visible.sync="drawerOpen"
  :append-to-body="true"
  ref="drawer"
  size="400px"
)
  section.content(v-if="model")
    campaign-action-form.form(:model="model")
    form-buttons(
      :loading="loading"
      :changed="changed"
      @deleteClick="deleteClick"
      @cancelClick="cancelClick"
      @saveClick="saveClick"
    )

</template>
<script>

import DrawerEditor from '@/lib/DrawerEditor';
import Action from '@/models/Action';
import CampaignActionForm from '@/components/campaigns/CampaignActionForm.vue';
import FormButtons from '@/lib/FormButtons.vue';

const NAME = 'CampaignActionEdit';

export default {
  computed: {
    modelOrigin() {
      return Action.get(this.actionId);
    },
  },
  methods: {
    modelInstance(actionId) {
      const record = actionId ? this.modelOrigin : {};
      return Action.mapper.createInstance({ ...record });
    },
    saveClick() {
      this.performOperation(() => Action.create(this.model));
    },
  },
  props: {
    actionId: {
      type: String,
      required: true,
    },
  },
  data() {
    return { model: null };
  },
  created() {
    this.$watch('actionId', actionId => {
      this.model = this.modelInstance(actionId);
    }, { immediate: true });
  },
  components: {
    FormButtons,
    CampaignActionForm,
  },
  mixins: [DrawerEditor],
  name: NAME,
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.content {
  position: relative;
  height: 100%;
  padding: 0 $margin-right;
}

</style>

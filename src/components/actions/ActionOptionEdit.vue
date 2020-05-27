<template lang="pug">

el-drawer.campaign-action-edit(
  :title="title"
  :before-close="handleClose"
  :visible.sync="drawerOpen"
  :append-to-body="true"
  :destroy-on-close="true"
  ref="drawer"
  size="450px"
  @closed="$emit('closed')"
)
  section.content
    campaign-action-form.form(:model="model" ref="form")
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
import CampaignActionForm from '@/components/campaigns/CampaignActionForm.vue';
import FormButtons from '@/lib/FormButtons.vue';
import remove from 'lodash/remove';

const NAME = 'ActionOptionEdit';

export default {
  name: NAME,
  computed: {
    modelOrigin() {
      return this.option;
    },
  },
  methods: {
    getModel() {
      return {
        required: {},
        ranges: [],
        ...this.cloneDeep(this.option),
      };
    },
    deleteClick() {
      this.performOperation(() => {
        this.$emit('delete');
      });
    },
    saveClick() {
      this.performOperation(() => {
        remove(this.model.ranges, ({ name }) => !name);
        this.$emit('save', this.model);
        // this.$refs.form.validate((isValid, invalidFields) => {
        //   console.log(isValid, invalidFields); // eslint-disable-line
        //   if (!isValid) {
        //     throw new Error('Данные некорректны');
        //   }
        // });
      });
    },
  },
  created() {
    this.model = this.getModel();
  },
  props: {
    title: String,
    option: {
      type: Object,
      required: true,
    },
  },
  components: {
    FormButtons,
    CampaignActionForm,
  },
  mixins: [DrawerEditor],
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.content {
  padding: 0 $margin-right 80px;
}

</style>

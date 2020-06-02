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
    campaign-action-form.form(:action="model" ref="form")
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
        required: { isMultiple: false },
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
        const { required } = this.model;
        if (required) {
          const { volume, volumeTo } = required;
          if (volumeTo < volume) {
            throw new Error('"Литров до" должно быть больше чем "Литров"');
          }
          const { cost, costTo } = required;
          if (costTo < cost) {
            throw new Error('"Сумма до" должна быть больше чем "Сумма"');
          }
        }

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

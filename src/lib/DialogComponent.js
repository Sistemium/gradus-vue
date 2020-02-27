import log from 'sistemium-telegram/services/log';

const { error } = log('DialogComponent');

export default {

  data() {
    return {
      visible: true,
      busy: false,
    };
  },

  created() {

  },

  beforeDestroy() {

  },

  methods: {

    submitClick() {
      const { form } = this.$refs;
      if (form) {
        form.validate(this.onValidate);
      }
    },

    closeDialog() {
      this.visible = false;
      this.$emit('closed');
    },

    async onValidate(res, errors) {

      if (!this.saveData) {
        return;
      }

      if (!res) {

        error('validation', errors);

        this.$message({
          message: 'Данные некорректны!',
          type: 'warning',
          duration: 5000,
        });

        return;

      }

      const loading = this.$message({
        message: 'Сохранение данных ...',
        type: 'warning',
        duration: 0,
      });

      this.busy = true;

      try {
        const saved = await this.saveData();
        this.visible = false;
        this.$emit('closed', saved);
      } catch (err) {
        error(err);
      }

      loading.close();
      this.busy = false;

    },

  },

};

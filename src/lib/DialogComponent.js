import log from 'sistemium-debug';

const { error } = log('DialogComponent');

export default {

  props: {
    from: [String, Object],
  },

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
      if (this.from) {
        this.$router.replace(this.from)
          .catch(e => error('closeDialog', e));
      }
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

export default {
  computed: {
    hasAuthoring() {
      return this.$hasAuthRole('actions')
        || this.$hasAuthRole('tester')
        || this.$hasAuthRole('admin');
    },
  },
};

export default {
  computed: {
    hasAuthoring() {
      return this.$hasAuthRole('catalogue')
        // || this.$hasAuthRole('tester')
        || this.$hasAuthRole('admin');
    },
  },
};

import Vue from 'vue';

Vue.mixin({
  methods: {
    $bindToModel(model) {
      model.bind(this);
      this.$once('hook:beforeDestroy', () => {
        model.unbindAll(this);
      });
    },
  },
});

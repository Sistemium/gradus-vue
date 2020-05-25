import Vue from 'vue';

Vue.mixin({
  methods: {
    $bindById(model, id, property = 'model') {
      model.bindOne(this, id, property);
      this.$once('hook:beforeDestroy', () => {
        model.unbindAll(this);
      });
    },
    $bindToModel(model) {
      model.bind(this);
      this.$once('hook:beforeDestroy', () => {
        model.unbindAll(this);
      });
    },
  },
});

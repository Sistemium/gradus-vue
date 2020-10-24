import Vue from 'vue';

Vue.mixin({
  methods: {
    $bindToModelFilter(model, filter, property) {
      model.bindAll(this, filter, property);
      unbindFn(this, model);
    },
    $bindById(model, id, property = 'model') {
      model.bindOne(this, id, property);
      unbindFn(this, model);
    },
    $bindToModel(model) {
      model.bind(this);
      unbindFn(this, model);
    },
    $watchImmediate(expOrFn, callback) {
      return this.$watch(expOrFn, callback, { immediate: true });
    },
  },
});

function unbindFn(component, model) {
  component.$once('hook:beforeDestroy', () => {
    model.unbindAll(component);
  });
}

import each from 'lodash/each';

// import log from 'sistemium-debug';

// const { debug } = log('ManagedComponent');

export default {

  created() {

    const { models } = this.$options;

    each(models, model => {
      // debug('created:', model.name);
      model.bind(this);
    });

  },

  beforeDestroy() {

    const { models } = this.$options;

    each(models, model => {
      // debug('beforeDestroy:', model.name);
      model.unbindAll(this);
    });

  },

};

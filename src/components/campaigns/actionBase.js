export default {

  props: {
    action: {
      type: Object,
      required: true,
    },
  },

  computed: {

    discountWidth() {
      const { discount } = this.$refs;
      return discount && discount.$el.clientWidth;
    },

    discount() {
      const { discountOwn: own = 0, discountComp: comp = 0 } = this.action;
      const total = comp + own;
      return total && {
        total,
        own,
        comp,
      };
    },

    hasOptions() {
      const { options } = this.action;
      return options && options.length && options;
    },

    hasRestrictions() {
      const { restrictions } = this.action;
      return restrictions && restrictions.length && restrictions;
    },

  },

};

import { discountInfo } from '@/models/Action';

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

    required() {
      return this.action.required;
    },

    discount() {
      return discountInfo(this.action);
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

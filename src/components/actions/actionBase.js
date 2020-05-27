import { discountInfo } from '@/models/Action';

export default {

  props: {
    action: {
      type: Object,
      required: true,
    },
  },

  computed: {

    hasRequired() {
      const { required } = this;
      if (!required) {
        return false;
      }
      const {
        pcs, sku, volume, cost,
      } = required;
      return pcs || sku || volume || cost;
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

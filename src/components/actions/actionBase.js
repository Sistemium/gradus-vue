import filter from 'lodash/filter';
import { discountInfo } from '@/models/Action';

export default {

  props: {
    action: {
      type: Object,
      required: true,
    },
  },

  computed: {

    requirements() {
      return [
        {
          title: 'Объем',
          cls: 'volume',
          fn(option) {
            const { pcs, volume, volumeTo } = option.required || {};
            const { cost, costTo, isMultiple } = option.required || {};
            const res = filter([
              pcs && filter([
                !isMultiple && 'от',
                `${pcs} бут.`,
              ])
                .join(' '),
              volume && filter([
                !isMultiple && 'от',
                `${volume} л.`,
                volumeTo && `до ${volumeTo}`,
              ])
                .join(' '),
              cost && filter([
                !isMultiple && 'от',
                `${cost} ₽`,
                costTo && `до ${costTo}`,
              ])
                .join(' '),
            ])
              .join('+');

            if (!res) {
              return undefined;
            }

            return filter([res, isMultiple && '(кратно)'])
              .join(' ');

          },
        },
        {
          title: 'SKU',
          cls: 'sku',
          fn(option) {
            const { sku } = option.required || {};
            return sku;
          },
        },
      ];
    },

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

    ownRequirements() {
      return filter(this.requirements
        .map(({ fn, cls }) => {
          const value = fn(this.action);
          return value && {
            cls,
            value,
          };
        }));
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

  methods: {
    optionRequirements(option) {
      return filter(this.requirements
        .map(({ fn, cls }) => {
          const value = fn(option);
          return value && {
            cls,
            value,
          };
        }));
    },
  },

};

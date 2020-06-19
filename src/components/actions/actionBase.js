import filter from 'lodash/filter';
import { discountInfo } from '@/models/Action';
import minBy from 'lodash/minBy';
import maxBy from 'lodash/maxBy';
import min from 'lodash/min';

export default {

  props: {
    action: {
      type: Object,
      required: true,
    },
    parent: {
      type: Object,
    },
  },

  computed: {

    requirements() {
      return [
        {
          title: 'Объем',
          cls: 'volume',
          fn: optionRequirementsInfo,
        },
        {
          title: 'SKU',
          cls: 'sku',
          fn(option) {
            const { sku } = option.required || {};
            return sku || matrixSkuMin(option);
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
        pcs, sku, volume, cost, etc,
      } = required;
      return pcs || sku || volume || cost || etc;
    },

    ownRequirements() {

      const res = this.requirements
        .map(({ fn, cls }) => {
          const value = fn(this.action);
          return {
            cls,
            value,
          };
        });

      if (!filter(res, 'value').length) {
        return [];
      }

      return res;

    },

    required() {
      return this.action.required;
    },

    discount() {
      const { discountMatrix } = this.action;
      if (discountMatrix) {
        return discountMatrixDiscountRange(discountMatrix);
      }
      return discountInfo(this.action);
    },

    isGrid() {
      return this.hasOptions || this.action.discountMatrix;
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
          return {
            cls,
            value,
          };
        }));
    },
  },

};

function matrixSkuMin({ discountMatrix }) {
  if (!discountMatrix) {
    return null;
  }
  const { axisY, axisX } = discountMatrix;
  const { sku: minY } = minBy(axisY, 'sku') || {};
  const { sku: minX } = minBy(axisX, 'sku') || {};
  const res = min(filter([minX, minY]));
  return res && `от ${res}`;
}

function volumeRequirements(required) {

  const { pcs, volume, volumeTo } = required;
  const { cost, costTo, isMultiple } = required;

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
    .join('\n+');

  if (!res) {
    return undefined;
  }

  return filter([
    `<span>${res}</span>`,
    isMultiple && '<small>(кратно)</small>',
    required.etc && `<em>${required.etc}</em>`,
  ])
    .join('');

}

function optionRequirementsInfo(option) {

  const { required = {}, discountMatrix } = option;
  const base = discountMatrix ? discountMatrixMinVolumes(discountMatrix) : required;
  return volumeRequirements(base);

}

function discountMatrixMinVolumes(discountMatrix, field = 'pcs') {
  const { axisY, axisX } = discountMatrix;
  const { [field]: minY } = minBy(axisY, field) || {};
  const { [field]: minX } = minBy(axisX, field) || {};
  const res = min(filter([minX, minY]));
  return { [field]: res };
}

function discountMatrixDiscountRange(discountMatrix) {
  const { values } = discountMatrix;
  const { discountOwn: discountOwnMin } = minBy(values, 'discountOwn') || {};
  const { discountOwn: discountOwnMax } = maxBy(values, 'discountOwn') || {};
  if (!discountOwnMin && !discountOwnMax) {
    return null;
  }
  return { own: `от ${discountOwnMin} до ${discountOwnMax}` };
}

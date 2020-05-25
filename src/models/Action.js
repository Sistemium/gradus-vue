import Model from 'sistemium-vue/jsdata/Model';
import map from 'lodash/map';
import filter from 'lodash/filter';
import maxBy from 'lodash/maxBy';

export default new Model({

  name: 'Action',

  validateOnSet: false,
  noValidate: true,
  keepChangeHistory: false,

  relations: {
    // hasMany: {
    //   Campaign: {
    //     localField: 'campaigns',
    //     foreignKey: 'actionIds',
    //   },
    // },
  },

  methods: {
    discountHeaders() {
      const res = discountInfo(this) || {};
      if (!res.total) {
        const optionsInfo = filter(map(this.options, option => discountInfo(option)));
        res.own = maxBy(optionsInfo, 'own').own;
        res.comp = maxBy(optionsInfo, 'comp').comp;
      }
      return filter([
        res.own && {
          title: 'коммерческая',
          name: 'discountOwn',
        },
        res.comp && {
          title: 'компенсируемая',
          name: 'discountComp',
        },
      ]);
    },
  },

});

export function discountInfo(action) {
  const { discountOwn: own = 0, discountComp: comp = 0 } = action;
  const total = comp + own;
  return total && {
    total,
    own,
    comp,
  };
}

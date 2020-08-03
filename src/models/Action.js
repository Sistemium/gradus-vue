import Model from 'sistemium-vue/jsdata/Model';
// import map from 'lodash/map';
import filter from 'lodash/filter';
// import maxBy from 'lodash/maxBy';
import './ActionHistory';

export default new Model({

  name: 'Action',

  validateOnSet: false,
  noValidate: true,
  keepChangeHistory: false,

  relations: {
    belongsTo: {
      Campaign: {
        localField: 'campaign',
        localKey: 'campaignId',
      },
    },
    hasMany: {
      ActionHistory: {
        localField: 'actionHistory',
        foreignKey: 'actionId',
      },
    },
  },

  methods: {
    discountHeaders() {
      // const res = discountInfo(this) || {};
      // if (!res.total) {
      //   const optionsInfo = filter(map(this.options, option => discountInfo(option)));
      //   if (!optionsInfo.length) {
      //     return [];
      //   }
      //   res.own = maxBy(optionsInfo, 'own').own;
      //   res.comp = maxBy(optionsInfo, 'comp').comp;
      // }
      return filter([
        {
          title: '% комп.',
          name: 'discountComp',
        },
        {
          title: '% комм.',
          name: 'discountOwn',
        },
      ]);
    },
  },

});

export function discountInfo(action) {
  const {
    discountOwn: own = 0,
    discountComp: comp = 0,
  } = action;
  const total = comp + own;
  return total ? {
    total,
    own,
    comp,
  } : undefined;
}

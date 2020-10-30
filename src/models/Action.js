import Model from 'sistemium-vue/jsdata/Model';
// import map from 'lodash/map';
import filter from 'lodash/filter';
// import maxBy from 'lodash/maxBy';
import './ActionHistory';
import './CampaignsPriority';

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
      // FIXME: CampaignActionEdit don't detect changes if this relation is defined
      // CampaignsPriority: {
      //   localField: 'priority',
      //   localKey: 'priorityId',
      // },
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
          title: '% общая',
          name: 'discountTotal',
          cls: 'total',
        },
        {
          title: '% комп.',
          name: 'discountComp',
          cls: 'comp',
        },
        {
          title: '% комм.',
          name: 'discountOwn',
          cls: 'own',
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

import Model from 'sistemium-vue/jsdata/Model';
import RelationCache from '@/lib/RelationCache';
// import Outlet from '@/models/Outlet';

const relationCache = new RelationCache({});

export default new Model({

  name: 'OutletStats',

  schema: {
    type: 'object',
    properties: {
      outlet: relationCache.one('outlet', 'outletId'),
    },
  },

  // indexes: ['outletId'],

  relations: {
    belongsTo: {
      // Salesman: {
      //   localField: 'salesman',
      //   foreignKey: 'salesmanId',
      // },
      // Outlet: {
      //   localField: 'outlet',
      //   localKey: 'outletId',
      // },
    },
    hasMany: {},
  },

});

relationCache.setRelations({
  outlet: 'Outlet',
});

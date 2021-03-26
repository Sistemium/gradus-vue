import Model from 'sistemium-vue/jsdata/Model';
import './Partner';

export default new Model({

  name: 'Outlet',

  relations: {
    belongsTo: {
      // Partner: {
      //   localField: 'partner',
      //   localKey: 'partnerId',
      // },
    },
    hasMany: {
      // OutletStats: {
      //   localField: 'stats',
      //   foreignKey: 'outletId',
      // },
    },
  },

});

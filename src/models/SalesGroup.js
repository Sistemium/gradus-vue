import Model from 'sistemium-vue/jsdata/Model';

export default new Model({

  name: 'SalesGroup',

  relations: {
    hasMany: {
      Salesman: {
        localField: 'salesmen',
        foreignKey: 'salesGroupId',
      },
    },
  },

  methods: {},

});

import Model from 'sistemium-vue/jsdata/Model';

export default new Model({

  name: 'Salesman',

  relations: {
    hasMany: {
      // SalesGroup: {
      //   localField: 'salesGroup',
      //   localKey: 'salesGroupId',
      // },
    },
  },

  methods: {},

});

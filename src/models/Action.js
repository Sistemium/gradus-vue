import Model from 'sistemium-vue/jsdata/Model';

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

  methods: {},

});

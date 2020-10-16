import Model from 'sistemium-vue/jsdata/Model';

export default new Model({

  name: 'ActionHistory',

  validateOnSet: false,
  noValidate: true,
  keepChangeHistory: false,

  relations: {
    belongsTo: {
      Action: {
        localField: 'action',
        localKey: 'actionId',
      },
    },
  },

  methods: {

  },

});

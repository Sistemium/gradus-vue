import Model from 'sistemium-vue/jsdata/Model';

export default new Model({

  name: 'Campaign',

  validateOnSet: false,
  noValidate: true,
  keepChangeHistory: false,

  relations: {
    hasMany: {
      CampaignPicture: {
        localField: 'pictures',
        foreignKey: 'campaignId',
      },
    },
  },

  methods: {},

});

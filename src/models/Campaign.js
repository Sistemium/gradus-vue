import Model from 'sistemium-vue/jsdata/Model';
import './Action';

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
      Action: {
        localField: 'actions',
        foreignKey: 'campaignId',
      },
    },
  },

});

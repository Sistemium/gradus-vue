import Model from 'sistemium-vue/jsdata/Model';
import './Action';
import './CampaignsPriority';

export default new Model({

  name: 'Campaign',

  validateOnSet: false,
  noValidate: true,
  keepChangeHistory: false,

  relations: {
    belongsTo: {
      CampaignsPriority: {
        localField: 'priority',
        localKey: 'priorityId',
      },
    },
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

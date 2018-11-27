import Model from 'sistemium-vue/jsdata/Model';

export default new Model({

  name: 'CampaignPicture',

  relations: {
    belongsTo: {
      Campaign: {
        localField: 'campaign',
        localKey: 'campaignId',
      },
    },

  },

});

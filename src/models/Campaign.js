import Model from 'sistemium-vue/jsdata/Model';
import Action from './Action';

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

  methods: {
    actions() {
      const { actionIds } = this;
      return actionIds ? Action.getMany(actionIds) : [];
    },
  },

});

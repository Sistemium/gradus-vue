import Model from 'sistemium-vue/jsdata/Model';
import './SalesTargetGroup';

export default new Model({

  name: 'SalesTarget',

  relations: {
    belongsTo: {
      SalesTargetGroup: {
        localField: 'targetGroup',
        localKey: 'targetGroupId',
      },
    },
  },

  methods: {},

});

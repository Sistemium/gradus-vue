import Model from 'sistemium-vue/jsdata/Model';
import './ArticleGroup';

export default new Model({

  name: 'SalesTargetGroup',

  relations: {
    belongsTo: {
      ArticleGroup: {
        localField: 'articleGroup',
        localKey: 'articleGroupId',
      },
    },
    hasMany: {
      SalesTarget: {
        localField: 'targets',
        foreignKey: 'targetGroupId',
      },
    },
  },

  methods: {},

});

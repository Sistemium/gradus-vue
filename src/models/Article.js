import Model from 'sistemium-vue/jsdata/Model';

import './ArticleGroup';

export default new Model({

  name: 'Article',

  relations: {
    belongsTo: {
      ArticleGroup: {
        localField: 'parent',
        localKey: 'articleGroupId',
      },
    },
  },

  methods: {},

});

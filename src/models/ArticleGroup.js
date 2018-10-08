import Model from 'sistemium-vue/jsdata/Model';

export default new Model({

  name: 'ArticleGroup',

  relations: {
    belongsTo: {
      ArticleGroup: {
        localField: 'parent',
        localKey: 'articleGroupId',
      },
    },
    hasMany: {
      ArticleGroup: {
        localField: 'children',
        foreignKey: 'articleGroupId',
      },
      Article: {
        localField: 'articles',
        foreignKey: 'articleGroupId',
      },
    },
  },

  methods: {
    parents() {
      const { parent } = this;
      const res = [];
      if (parent) {
        res.push(...parent.parents(), parent);
      }
      return res;
    },
  },

});

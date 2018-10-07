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
  },

  methods: {
    parents() {
      return this.parent ? [this.parent] : [];
    },
  },

});

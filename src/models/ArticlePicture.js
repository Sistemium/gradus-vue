import Model from 'sistemium-vue/jsdata/Model';

export default new Model({

  name: 'ArticlePicture',

  relations: {
    belongsTo: {
      // Article: {
      //   localField: 'article',
      //   localKey: 'articleId',
      // },
    },
  },

  methods: {},

});

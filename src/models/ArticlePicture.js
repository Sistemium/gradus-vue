import Model from 'sistemium-vue/jsdata/Model';

export default new Model({

  name: 'ArticlePicture',

  validateOnSet: false,
  noValidate: true,
  keepChangeHistory: false,

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

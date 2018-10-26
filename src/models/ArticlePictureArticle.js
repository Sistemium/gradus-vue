import Model from 'sistemium-vue/jsdata/Model';

export default new Model({

  name: 'ArticlePictureArticle',

  validateOnSet: false,
  noValidate: true,
  keepChangeHistory: false,

  relations: {
    belongsTo: {
      // Article: {
      //   localField: 'article',
      //   localKey: 'articleId',
      // },
      // ArticlePicture: {
      //   localField: 'picture',
      //   localKey: 'pictureId',
      // },
    },
  },

  methods: {},

});

import Model from 'sistemium-vue/jsdata/Model';
import RelationCache from '@/lib/RelationCache';

import ArticleGroup from './ArticleGroup';  // eslint-disable-line
import ArticlePicture from './ArticlePicture';

const relationCache = new RelationCache({});

const Article = new Model({

  name: 'Article',

  validateOnSet: false,
  noValidate: true,
  keepChangeHistory: false,

  schema: {
    type: 'object',
    properties: {
      parent: relationCache.one('parent', 'articleGroupId'),
      sameArticles: relationCache.many('articleSameId'),
      avatarPicture: relationCache.one('avatarPicture', 'avatarPictureId'),
    },
  },

  indexes: ['articleGroupId', 'articleSameId'],

  relations: {
    belongsTo: {
      // ArticleGroup: {
      //   localField: 'parent',
      //   localKey: 'articleGroupId',
      // },
      // ArticlePicture: {
      //   localField: 'avatarPicture',
      //   localKey: 'avatarPictureId',
      // },
      // Article: {
      //   localField: 'sameArticle',
      //   localKey: 'articleSameId',
      // },
    },
    hasMany: {
      // Article: {
      //   localField: 'sameArticles',
      //   foreignKey: 'articleSameId',
      // },
    },
  },

  methods: {},

});

export default Article;

relationCache.setRelations({
  parent: ArticleGroup,
  articleSameId: Article,
  avatarPicture: ArticlePicture,
});

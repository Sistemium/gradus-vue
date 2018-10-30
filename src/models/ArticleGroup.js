import Model from 'sistemium-vue/jsdata/Model';
import forEach from 'lodash/forEach';

import RelationCache from '@/lib/RelationCache';
import Article from './Article';

const relationCache = new RelationCache({});

const ArticleGroup = new Model({

  name: 'ArticleGroup',

  validateOnSet: false,
  noValidate: true,
  keepChangeHistory: false,

  schema: {
    type: 'object',
    properties: {
      parent: relationCache.one('parent', 'articleGroupId'),
      children: relationCache.many('articleGroupId'),
      articles: relationCache.many('articles', 'articleGroupId'),
    },
  },

  indexes: ['articleGroupId'],

  relations: {
    // belongsTo: {
    //   ArticleGroup: {
    //     localField: 'parent',
    //     localKey: 'articleGroupId',
    //   },
    // },
    hasMany: {
      // ArticleGroup: {
      //   localField: 'children',
      //   foreignKey: 'articleGroupId',
      // },
      // Article: {
      //   localField: 'articles',
      //   foreignKey: 'articleGroupId',
      // },
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

    descendants() {
      const { children } = this;
      const res = [this];
      forEach(children, child => {
        res.push(...child.descendants());
      });
      return res;
    },

    ancestors() {
      const { parent } = this;
      const res = [this];
      if (parent) {
        res.push(...parent.ancestors());
      }
      return res;
    },

    hasArticles() {
      return this.articles && this.articles.length;
    },

  },

});

export default ArticleGroup;

relationCache.setRelations({
  parent: ArticleGroup,
  articleGroupId: ArticleGroup,
  articles: Article,
});

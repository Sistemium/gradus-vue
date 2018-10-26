import VueManagedModel from 'sistemium-vue/jsdata/Model';
import forEach from 'lodash/forEach';

<<<<<<< HEAD
export default new VueManagedModel({
=======
import RelationCache from '@/lib/RelationCache';

const relationCache = new RelationCache({});

const ArticleGroup = new Model({
>>>>>>> master

  name: 'ArticleGroup',

  validateOnSet: false,
  noValidate: true,
  keepChangeHistory: false,

  schema: {
    type: 'object',
    properties: {
      parent: relationCache.one('parent', 'articleGroupId'),
      children: relationCache.many('articleGroupId'),
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
});

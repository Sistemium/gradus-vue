import Model from 'sistemium-vue/jsdata/Model';
import forEach from 'lodash/forEach';

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

  },

});

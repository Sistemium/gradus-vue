import map from 'lodash/map';
import filter from 'lodash/filter';
import Model from 'sistemium-vue/jsdata/Model';
import './SalesTargetGroup';
import Article from './Article';


export default new Model({

  name: 'SalesTarget',

  relations: {
    belongsTo: {
      SalesTargetGroup: {
        localField: 'targetGroup',
        localKey: 'targetGroupId',
      },
    },
    // hasMany: {
    //   Article: {
    //     localField: 'article',
    //     localKey: 'articleIds',
    //   },
    // },
  },

  methods: {
    articles() {
      return Article.getMany(this.articleIds);
    },
    async loadArticles() {
      const toLoad = filter(map(this.articleIds, id => (Article.get(id) ? null : id)));
      return toLoad.length && Article.findAll({ id: toLoad });
    },
  },

});

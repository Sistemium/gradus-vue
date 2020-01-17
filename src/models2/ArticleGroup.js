import STGModel from '@/lib/STGModel';
import forEach from 'lodash/forEach';

export default class ArticleGroup extends STGModel {

  static entity = 'ArticleGroup';

  static fields() {
    return {

      id: this.attr(null),
      name: this.attr(null),
      articleGroupId: this.attr(null),

      children: this.hasMany(ArticleGroup, 'articleGroupId'),
      parent: this.belongsTo(ArticleGroup, 'articleGroupId'),
      articles: this.hasMany('Article', 'articleGroupId'),

    };
  }

  parents() {
    const { parent } = this;
    const res = [];
    if (parent) {
      res.push(...parent.parents(), parent);
    }
    return res;
  }

  descendants() {
    const { children } = this;
    const res = [this];
    forEach(children, child => {
      res.push(...child.descendants());
    });
    return res;
  }

  ancestors() {
    const { parent } = this;
    const res = [this];
    if (parent) {
      res.push(...parent.ancestors());
    }
    return res;
  }

  hasArticles() {
    return this.articles && this.articles.length;
  }

}

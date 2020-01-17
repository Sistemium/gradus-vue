import forEach from 'lodash/forEach';
import STGModel from '@/lib/STGModel';

export default class Article extends STGModel {

  static entity = 'Article';

  static fields() {
    return {

      id: this.attr(null),
      name: this.attr(null),
      packageRel: this.attr(null),
      extraLabel: this.attr(null),
      avatarPictureId: this.attr(null),
      articleSameId: this.attr(null),
      articleGroupId: this.attr(null),

      parent: this.belongsTo('ArticleGroup', 'articleGroupId'),
      sameArticles: this.hasMany(Article, 'articleSameId'),
      avatarPicture: this.belongsTo('ArticlePicture', 'avatarPictureId'),

    };
  }

}

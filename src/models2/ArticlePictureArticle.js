import STGModel from '@/lib/STGModel';

export default class ArticlePictureArticle extends STGModel {

  static entity = 'ArticlePictureArticle';

  static fields() {
    return {
      id: this.attr(null),
      articleId: this.attr(null),
      pictureId: this.attr(null),
      author: this.attr(null),
      parent: this.belongsTo('Article', 'articleId'),
      avatarPicture: this.belongsTo('ArticlePicture', 'pictureId'),
    };
  }

}

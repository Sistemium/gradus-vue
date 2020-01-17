import STGModel from '@/lib/STGModel';

export default class ArticlePicture extends STGModel {

  static entity = 'ArticlePicture';

  static fields() {
    return {
      id: this.attr(null),
      name: this.attr(null),
      articleId: this.attr(null),
    };
  }

}

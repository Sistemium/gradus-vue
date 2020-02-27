import STGModel from '@/lib/STGModel';

export default class ArticlePicture extends STGModel {

  static entity = 'ArticlePicture';

  static fields() {
    return {
      id: this.attr(null),
      name: this.attr(null),
      articleId: this.attr(null),
      author: this.attr(null),
      src: this.attr(null),
      href: this.attr(null),
      thumbnailSrc: this.attr(null),
      smallSrc: this.attr(null),
      largeSrc: this.attr(null),
    };
  }

}

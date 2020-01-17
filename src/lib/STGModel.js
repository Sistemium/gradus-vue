import { Model } from '@vuex-orm/core';
import forEach from 'lodash/forEach';

export default class STGModel extends Model {

  static async fetchAll(options) {
    if (this.all().length) {
      return;
    }
    await this.api().get(this.entity, options);
  }

  static get(id) {
    return this.find(id);
  }

  static getMany(ids) {
    return this.findIn(ids);
  }

  static filter(conditions) {
    if (!conditions) {
      return this.all();
    }
    const q = this.query();
    forEach(conditions, (val, key) => {
      q.where(key, val);
    });
    return q.get();
  }

}

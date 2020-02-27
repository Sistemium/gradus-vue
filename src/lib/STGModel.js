import { Model } from '@vuex-orm/core';
import forEach from 'lodash/forEach';

export default class STGModel extends Model {

  static queryCache = {};

  static async fetchAll(options) {
    if (this.all().length) {
      return;
    }
    await this.api()
      .get(this.entity, options);
  }

  static async findAll(filter = {}, options = {}) {
    const key = JSON.stringify(filter || {});
    const cached = this.queryCache[key];
    if (!cached) {
      await this.api()
        .get(this.entity, {
          params: filter,
          ...options,
        });
    }
    return this.filter(filter);
  }

  static async findById(id, options = {}) {
    const cached = this.queryCache[id];
    if (!cached) {
      await this.api()
        .get(`${this.entity}/${id}`, options);
    }
    return this.find(id);
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

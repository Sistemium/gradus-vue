import each from 'lodash/each';
import { getModel } from 'sistemium-vue/jsdata/Model';

export default class RelationCache {

  /**
   * @param {Object} [props.relations]
   */

  constructor(props) {
    if (props.relations) {
      this.setRelations(props.relations);
    }
  }

  /**
   * @param {Object} relations
   */

  setRelations(relations) {
    this.cache = {};
    this.relations = relations;
    each(this.relations, (type, name) => {
      this.cache[name] = {};
    });
  }

  getOne(name, id) {
    if (!id) {
      return null;
    }
    const modelName = this.relations[name];
    const model = getModel(modelName);
    return model ? model.get(id) : null;
  }

  getMany(name, fk, id) {
    if (!id) {
      return [];
    }
    const modelName = this.relations[name];
    const model = getModel(modelName);
    const index = model.indexed[fk];
    return index[id];
  }

  one(name, prop) {
    const cache = this;
    return {
      type: 'object',
      get() {
        return cache.getOne(name, this[prop]);
      },
    };
  }

  many(name, fk = name, prop = 'id', filterFn) {
    const cache = this;
    return {
      type: 'array',
      configurable: true,
      enumerable: false,
      get() {
        const res = cache.getMany(name, fk, this[prop]);
        if (res && res.length && filterFn) {
          return res.filter(filterFn);
        }
        return res;
      },
    };
  }

}

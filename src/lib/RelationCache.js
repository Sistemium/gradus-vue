import each from 'lodash/each';

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
    return this.relations[name].get(id);
  }

  getMany(name, id) {
    if (!id) {
      return [];
    }
    const model = this.relations[name];
    const index = model.indexed[name];
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

  many(name, prop = 'id') {
    const cache = this;
    return {
      type: 'array',
      configurable: true,
      enumerable: false,
      get() {
        return cache.getMany(name, this[prop]);
      },
    };
  }

}

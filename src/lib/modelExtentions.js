import chunk from 'lodash/chunk';
import uniq from 'lodash/uniq';
import flatten from 'lodash/flatten';
import Model from 'sistemium-vue/jsdata/Model';
import { serverTimestamp } from '@/lib/dates';
import noop from 'lodash/noop';

async function findByMany(ids, options = {}) {

  const {
    chunkSize = 100,
    field = 'id',
    force = false,
    onProgress = noop,
  } = options;

  const chunks = chunk(uniq(ids), chunkSize);
  const { length: total } = chunks;

  return Promise.all(chunks.map((chunkIds, idx) => {
    const where = { [field]: { in: chunkIds } };
    return this.findAll({ where }, { force })
      .then(res => {
        onProgress({
          total,
          current: idx + 1,
        });
        return res;
      });
  }))
    .then(flatten);

}

function createWithDeviceCts(params) {

  if (!params.deviceCts) {
    Object.assign(params, { deviceCts: serverTimestamp() });
  }

  return this.store.create(this.name, params);
}

Model.prototype.findByMany = findByMany;
Model.prototype.create = createWithDeviceCts;

Object.assign(Model.prototype, {

  reactiveFilter(filter) {
    return this.ts && this.filter(filter);
  },

  reactiveGet(id) {
    return this.ts && this.get(id);
  },

});

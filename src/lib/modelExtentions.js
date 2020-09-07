import chunk from 'lodash/chunk';
import uniq from 'lodash/uniq';
import flatten from 'lodash/flatten';

// eslint-disable-next-line import/prefer-default-export
export async function findByMany(model, ids, options = {}) {

  const { chunkSize = 100, field = 'id', force = false } = options;

  const chunks = chunk(uniq(ids), chunkSize);

  return Promise.all(chunks.map(chunkIds => {
    const where = { [field]: { in: chunkIds } };
    return model.findAll({ where }, { force });
  }))
    .then(flatten);

}

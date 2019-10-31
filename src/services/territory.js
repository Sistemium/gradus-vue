import groupBy from 'lodash/groupBy';
import fpOrderBy from 'lodash/fp/orderBy';
import map from 'lodash/map';
import get from 'lodash/get';

import SalesGroup from '@/models/SalesGroup';
import Salesman from '@/models/Salesman';
import PossibleOutlet from '@/models/PossibleOutlet';

const orderByName = fpOrderBy(['name'], ['asc']);

export async function loadTerritory() {
  await SalesGroup.findAll();
  await Salesman.findAll();
  await PossibleOutlet.findAll();
}


export function groupedSalesman() {

  const data = groupBy(Salesman.getAll(), 'salesGroupId');

  return orderByName(map(data, (items, id) => ({
    id,
    name: get(SalesGroup.get(id), 'name'),
    items: orderByName(items)
      .map(item => ({
        ...item,
        count() {
          return possibleOutlets(item.id).length;
        },
      }))
      .filter(item => item.count()),
  })));

}

export function possibleOutlets(salesmanId) {

  const data = PossibleOutlet.filter({ salesmanId });

  return orderByName(data);

}

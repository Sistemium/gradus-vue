import groupBy from 'lodash/groupBy';
import fpOrderBy from 'lodash/fp/orderBy';
import map from 'lodash/map';
import get from 'lodash/get';
import escapeRegExp from 'lodash/escapeRegExp';

import SalesGroup from '@/models/SalesGroup';
import Salesman from '@/models/Salesman';
import PossibleOutlet from '@/models/PossibleOutlet';
import PossibleOutletPhoto from '@/models/PossibleOutletPhoto';

const orderByName = fpOrderBy(['name'], ['asc']);

export async function loadTerritory() {
  await SalesGroup.findAll();
  await Salesman.findAll();
  await PossibleOutlet.findAll();
  await PossibleOutletPhoto.findAll();
}

export function salesmanById(salesmanId) {
  return Salesman.get(salesmanId);
}

export function possibleOutletById(id) {
  return PossibleOutlet.get(id);
}

export function groupedSalesman() {

  const data = groupBy(Salesman.getAll(), 'salesGroupId');
  const grouped = map(data, (items, id) => ({
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
  }));

  return orderByName(grouped.filter(({ items }) => items.length));

}

export function possibleOutlets(salesmanId) {

  const data = orderByName(PossibleOutlet.filter({ salesmanId }));

  return orderByName(data);

}

export function filterOutlets(outlets, searchText) {

  if (!searchText) {
    return outlets;
  }

  const re = new RegExp(escapeRegExp(searchText), 'i');

  return outlets.filter(({ name, address }) => re.test(name) || re.test(address));

}

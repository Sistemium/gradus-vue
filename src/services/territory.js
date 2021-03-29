import groupBy from 'lodash/groupBy';
import fpOrderBy from 'lodash/fp/orderBy';
import map from 'lodash/map';
import get from 'lodash/get';
import filter from 'lodash/filter';
// import pick from 'lodash/pick';
import noop from 'lodash/noop';
import escapeRegExp from 'lodash/escapeRegExp';

import SalesGroup from '@/models/SalesGroup';
import Salesman from '@/models/Salesman';
import PossibleOutlet from '@/models/PossibleOutlet';
import PossibleOutletPhoto from '@/models/PossibleOutletPhoto';
import OutletStats from '@/models/OutletStats';
import Outlet from '@/models/Outlet';

const orderByName = fpOrderBy(['name'], ['asc']);

const { VUE_APP_PERFECT_SHOP_SALE_TYPES } = process.env;
const PERFECT_SHOP_SALE_TYPES = JSON.parse(VUE_APP_PERFECT_SHOP_SALE_TYPES);

export async function loadTerritory() {
  await loadSalesmen();
  await PossibleOutlet.findAll();
  await PossibleOutletPhoto.findAll();
}

export async function loadSalesmen(onProgress = noop) {
  onProgress('групп ТП');
  await SalesGroup.findAll();
  onProgress('ТП');
  await Salesman.findAll();
}

export async function loadOutletStats(dateB, dateE, onProgress = noop) {

  onProgress('результатов акций');

  const stats = await OutletStats.fetchAll({
    dateB,
    dateE,
    limit: 1000,
  });

  const toLoad = filter(stats, ({ outlet }) => !outlet);
  const ids = map(toLoad, 'outletId');

  onProgress('торговых точек');
  await Outlet.findByMany(ids, { chunkSize: 150 });

}

export function salesmanById(salesmanId) {
  return Salesman.get(salesmanId);
}

export function possibleOutletById(id) {
  return PossibleOutlet.get(id);
}

export function perfectShopStatById(id) {
  // noop(OutletStats.ts);
  // noop(Outlet.ts);
  const stat = OutletStats.get(id) || {};
  return {
    ...stat,
    outlet: Outlet.get(stat.outletId) || {},
  };
}

export function groupedSalesman(searchText, outletsFn) {

  const re = new RegExp(`^${escapeRegExp(searchText)}`, 'i');
  const data = groupBy(Salesman.getAll(), 'salesGroupId');

  const grouped = map(data, (salesmen, id) => ({

    id,
    name: get(SalesGroup.get(id), 'name'),

    items: orderByName(salesmen)
      .map(salesman => {
        const outlets = outletsFn(salesman.id);
        return {
          ...salesman,
          outlets: re.test(salesman.name) ? outlets : filterOutlets(outlets, searchText),
          count() {
            return this.outlets.length;
          },
        };
      })
      .filter(item => item.count()),

  }));

  return orderByName(grouped.filter(({ items }) => items.length));

}

function perfectShopInfo({ stats: { perfectShop } }) {

  const {
    level,
    blocksProgress,
    assortmentsProgress,
  } = perfectShop;

  const blocksInfo = progressNumbers(blocksProgress);
  const assortmentsInfo = progressNumbers(assortmentsProgress);

  return {
    level,
    blocksProgress,
    assortmentsProgress,
    close: blocksInfo.result || assortmentsInfo.result,
  };

}

const PROGRESS_RE = /(\d+) \/ (\d+)/;

function progressNumbers(string) {

  const [, doneString, totalString] = string.match(PROGRESS_RE);

  const done = parseInt(doneString, 0);
  const total = parseInt(totalString, 0);

  return {
    done,
    total,
    result: done + 1 >= total,
  };

}

export function outletStatsBySalesmanId(salesmanId, dateB, dateE) {

  const data = OutletStats.filter({
    salesmanId,
    dateE,
    dateB,
  });

  const { salesGroup } = Salesman.get(salesmanId) || {};

  if (!salesGroup || !PERFECT_SHOP_SALE_TYPES.includes(salesGroup.saleTypeName)) {
    return [];
  }

  return orderByName(map(data, item => ({
    id: item.id,
    name: get(item.outlet, 'name'),
    address: get(item.outlet, 'address'),
    ...perfectShopInfo(item),
  })));

}

export function possibleOutlets(salesmanId) {

  const data = PossibleOutlet.filter({ salesmanId });

  return orderByName(data);

}

export function filterOutlets(outlets, searchText) {

  if (!searchText) {
    return outlets;
  }

  const re = new RegExp(escapeRegExp(searchText), 'i');

  return outlets.filter(outlet => {
    const {
      name,
      address,
    } = outlet;
    return re.test(name) || re.test(address);
  });

}

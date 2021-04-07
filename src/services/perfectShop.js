import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import filter from 'lodash/filter';
import flatten from 'lodash/flatten';


export function assortmentByBlock(assortments) {

  const withBlock = map(assortments, assortment => {

    const { assortmentName } = assortment;
    const [, blockName, name] = assortmentName.match(/^(.+) \/ (.+)$/);

    return {
      blockName,
      name,
      ...assortment,
    };

  });

  return groupBy(withBlock, 'blockName');

}


export function blocksFromStat(statLevel) {

  const {
    blocks,
    assortments,
  } = statLevel;

  const assortmentMap = assortmentByBlock(assortments);

  return map(blocks, block => {
    const blockAssortment = assortmentMap[block.name];
    return {
      assortments: blockAssortment.map(a => ({
        rowspan: filter(blockAssortment, { name: a.name }).length,
        ...a,
      })),
      rowspan: blockAssortment.length,
      ...block,
    };
  });

}

export function ruleName(rule) {
  switch (rule) {
    case 'countryCnt':
      return 'Страны';
    case 'skuCnt':
      return 'SKU';
    case 'brandCnt':
      return 'Бренды';
    case 'pieceCnt':
      return 'Бутылки';
    case 'litreCnt':
      return 'Литры';
    default:
      return rule;
  }
}

export function perfectShopLevels() {

  return ['BRONZE', 'SILVER', 'GOLD'];

}

export function downloadResultsSchema() {
  return {
    columns: [{
      key: 'name',
      title: 'Контрагент',
      width: 40,
    }, {
      key: 'address',
      title: 'Адрес',
      width: 60,
    }, {
      key: 'level',
      title: 'Уровень',
      width: 12,
    }, {
      key: 'blocksProgress',
      title: 'Блоки',
      width: 12,
    }, {
      key: 'assortmentsProgress',
      title: 'Ассортимент',
      width: 12,
    }],
  };
}

export function mapDownloadReadyStats(readyStats) {

  const salesmen = flatten(map(readyStats, 'items'));

  const res = map(salesmen, stat => map(stat.outlets, outlet => ({
    salesman: stat.name,
    ...outlet,
  })));

  return flatten(res);

}

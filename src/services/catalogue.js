import filter from 'lodash/filter';
import keyBy from 'lodash/keyBy';
import flatten from 'lodash/flatten';
import uniq from 'lodash/uniq';
import map from 'lodash/map';

import ArticleGroup from '@/models/ArticleGroup';
import Article from '@/models/Article';

import log from 'sistemium-telegram/services/log';

const { debug } = log('catalogue');

export async function loadData() {

  await ArticleGroup.findAll({
    limit: 10000,
  });

  await Article.findAll({
    limit: 20000,
    'x-offset:': '*',
  });

  const articles = Article.filter({});
  debug('articles', articles.length);

  const groupsWithArticlesIDs = Object.keys(keyBy(articles, 'articleGroupId'));
  debug('groupsWithArticlesIDs', groupsWithArticlesIDs.length);

  const groupsWithArticles = filter(groupsWithArticlesIDs.map(id => ArticleGroup.get(id)));
  const parents = groupsWithArticles.map(item => map(item.ancestors(), 'id'));
  const parentsWithArticlesIDs = uniq(flatten(parents));
  debug('parentsWithArticlesIDs', parentsWithArticlesIDs.length);

  let removedCount = 0;

  ArticleGroup.filter()
    .forEach(ag => {
      if (parentsWithArticlesIDs.indexOf(ag.id) === -1) {
        ArticleGroup.remove(ag);
        removedCount += 1;
      }
    });

  debug('removedCount', removedCount);

}

export function articlesByGroupID(articleGroup) {
  const ids = keyBy(flatten(filter(map(articleGroup.descendants(), 'children'))), 'id');
  ids[articleGroup.id] = articleGroup;
  return filter(Article.filter(), ({ articleGroupId }) => ids[articleGroupId]);
}

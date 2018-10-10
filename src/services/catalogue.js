import filter from 'lodash/filter';
import keyBy from 'lodash/keyBy';
import flatten from 'lodash/flatten';
import uniq from 'lodash/uniq';
import map from 'lodash/map';
import escapeRegExp from 'lodash/escapeRegExp';
import orderBy from 'lodash/orderBy';

import ArticleGroup from '@/models/ArticleGroup';
import Article from '@/models/Article';
import ArticlePicture from '@/models/ArticlePicture';

import log from 'sistemium-telegram/services/log';

const { debug } = log('catalogue');

export async function loadData() {

  await ArticleGroup.findAll({
    limit: 10000,
  });

  await ArticlePicture.findAll({
    limit: 20000,
    // 'x-offset:': '*',
  });

  await Article.findAll({
    limit: 1000,
    // 'x-offset:': '*',
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

export function articlesByGroupID(articleGroup, search) {

  if (!articleGroup) {
    return searchArticles(Article.filter(), search);
  }

  const ids = keyBy(flatten(filter(map(articleGroup.descendants(), 'children'))), 'id');
  ids[articleGroup.id] = articleGroup;
  return searchArticles(
    orderBy(filter(Article.filter(), ({ articleGroupId }) => ids[articleGroupId]), 'name'),
    search,
  );

}

export function articleGroupsBySearch(search) {

  const articles = searchArticles(Article.filter(), search);
  debug('articleGroupsBySearch:articles', articles.length);

  const groupIds = uniq(map(articles, 'articleGroupId'));
  const groupsWithArticles = filter(groupIds.map(id => ArticleGroup.get(id)));

  const parents = groupsWithArticles.map(item => map(item.ancestors(), 'id'));
  const parentsWithArticlesIDs = uniq(flatten(parents));

  debug('articleGroupsBySearch', search, parentsWithArticlesIDs.length);

  return orderBy(parentsWithArticlesIDs.map(id => ArticleGroup.get(id)), 'name');

}


function searchArticles(articles, search) {

  if (!search) {
    return articles;
  }

  const re = new RegExp(escapeRegExp(search), 'i');
  return filter(articles, a => re.test(a.name));

}
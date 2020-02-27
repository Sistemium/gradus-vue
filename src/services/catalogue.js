import intersection from 'lodash/intersection';
import filter from 'lodash/filter';
import keyBy from 'lodash/keyBy';
import flatten from 'lodash/flatten';
import get from 'lodash/get';
import uniq from 'lodash/uniq';
import map from 'lodash/map';
import escapeRegExp from 'lodash/escapeRegExp';
import orderBy from 'lodash/orderBy';

import Vue from 'vue';

import ArticleGroup from '@/models2/ArticleGroup';
import Article from '@/models2/Article';
import ArticlePicture from '@/models2/ArticlePicture';
import ArticlePictureArticle from '@/models2/ArticlePictureArticle';

import log from 'sistemium-telegram/services/log';

const { debug, error } = log('catalogue');

export async function loadData() {

  const fetchParams = {
    // headers: { 'x-page-size': 1500 },
  };

  debug('loadData:start');

  await ArticleGroup.fetchAll(fetchParams);

  await ArticlePicture.fetchAll(fetchParams);

  await Article.fetchAll(fetchParams);

  const articles = Article.all();
  debug('articles', articles.length);

  const groupsWithArticlesIDs = Object.keys(keyBy(articles, 'articleGroupId'));
  debug('groupsWithArticlesIDs', groupsWithArticlesIDs.length);

  const groupsWithArticles = ArticleGroup.query()
    .whereIdIn(groupsWithArticlesIDs)
    .with('parent')
    .get();
  const parents = groupsWithArticles.map(item => map(item.ancestors(), 'id'));
  const parentsWithArticlesIDs = keyBy(flatten(parents));

  const deleted = await ArticleGroup.delete(g => !parentsWithArticlesIDs[g.id]);

  debug('removedCount', deleted.length);

}

export async function setArticleAvatar(article, picture) {

  const { id: articleId } = article;
  const { id: pictureId = null } = picture || {};

  debug('setArticleAvatar', articleId, pictureId);
  Vue.set(article, 'avatarPictureId', pictureId);
  return Article.safeSave(article, true);

}

export async function getArticlePictures(article) {
  const where = { articleId: article.id };
  const apa = await ArticlePictureArticle.findAll(where);
  await Promise.all(apa.map(({ pictureId }) => ArticlePicture.findById(pictureId)));
  return apa
    .map(({ pictureId }) => ArticlePicture.get(pictureId));
}


export function getArticle(id) {
  debug('getArticle:id', id);
  const res = Article.query()
    .withAll()
    .find(id);
  debug('getArticle:res', !!res);
  return res;
}

export function getArticles(ids) {
  debug('getArticles:ids', ids.length);
  const res = Article.query()
    .whereIdIn(ids)
    .with('sameArticles')
    .get();
  debug('getArticles:res', res.length);
  return res;
}


export function getArticleGroup(id) {
  debug('getArticleGroup:id', id);
  const res = ArticleGroup.query()
    .with(['parent', 'children'])
    .find(id);
  debug('getArticleGroup:res', res.length);
  return res;
}


export function articlesByGroupID(articleGroup, filters) {

  debug('articlesByGroupID:id', articleGroup);

  const articles = Article.query()
    .withAll()
    .get();

  if (!articleGroup) {
    return filterArticles(articles, filters);
  }

  const ids = keyBy(flatten(filter(map(articleGroup.descendants(), 'children'))), 'id');
  ids[articleGroup.id] = articleGroup;

  debug('articlesByGroupID:ids', articles.length, ids);

  const res = filterArticles(
    orderBy(filter(articles, ({ articleGroupId }) => ids[articleGroupId]), 'name'),
    filters,
  );

  debug('articlesByGroupID:res', res.length);
  return res;

}

export function articleGroupsByArticles(articles) {

  debug('articleGroupsBySearch:articles', articles.length);

  const groupIds = uniq(map(articles, 'articleGroupId'));
  const groupsWithArticles = ArticleGroup.query()
    .whereIdIn(groupIds)
    .with(['parent'])
    .get();

  const parents = groupsWithArticles.map(item => map(item.ancestors(), 'id'));
  const parentsWithArticlesIDs = uniq(flatten(parents));

  debug('articleGroupsBySearch', parentsWithArticlesIDs.length);

  const res = ArticleGroup.query()
    .whereIdIn(parentsWithArticlesIDs)
    .with(['children', 'parent'])
    .orderBy('name')
    .get();

  debug('articleGroupsByArticles:res', res.length);
  return res;

}


export function catalogueArticleGroups(currentArticleGroup, articles, filteredGroups) {

  const { id: articleGroupId = null, children = [] } = currentArticleGroup || {};

  let groups;

  if (children.length || !articleGroupId) {
    groups = filter(filteredGroups, g => g.articleGroupId === articleGroupId);
    debug('bindCurrent', groups.length, articleGroupId, children.length);
  } else {
    groups = orderBy(intersection(currentArticleGroup.parent.children, filteredGroups), 'name');
  }

  let parents = [];

  if (articleGroupId) {
    if (children.length) {
      parents = [
        ...currentArticleGroup.parents(),
        currentArticleGroup,
      ];
    } else {
      parents = currentArticleGroup.parents();
    }
  }

  return {
    parents,
    groups,
  };

}

export function removeArticlePicture(article, picture) {

  const { id: articleId } = article;
  const { id: pictureId } = picture;

  const destroy = ArticlePictureArticle.filter({
    articleId,
    pictureId,
  })
    .map(apa => ArticlePictureArticle.destroy(apa));

  return Promise.all(destroy);

}

export function unsetSameArticle(article) {
  return Article.update({
    where: article.id,
    data: { articleSameId: null },
  });
}

/**
 * Links articles to each other
 * @param {Object} article
 * @param {Array} sameArticles
 */

export function setSameArticle(article, sameArticles) {

  const { id: articleSameId } = article;

  const saving = sameArticles.map(id => {
    const sameArticle = Article.get(id);
    if (!sameArticle) {
      error('Not found same article', id);
      return false;
    }
    // sameArticle.articleSameId = articleSameId;
    // return Article.safeSave(sameArticle, true);
    return Article.update({
      where: sameArticle.id,
      data: { articleSameId },
    });
  });

  return Promise.all(saving);

}

/**
 * Only articles not linked with same
 * @param {Array} articles
 */

export function groupedArticles(articles) {
  return filter(articles, a => !a.articleSameId);
}

function filterArticles(articles, filters) {

  const { searchText, onlyNoAvatar } = filters;

  if (!searchText && !onlyNoAvatar) {

    return articles;

  }

  debug('filterArticles:filters', searchText, onlyNoAvatar);

  const re = searchText && new RegExp(escapeRegExp(searchText), 'i');

  const res = filter(articles, a => {
    if (re && !re.test(a.name)) {
      return false;
    }
    return !onlyNoAvatar || !a.avatarPicture;
  });

  debug('filterArticles:res', res.length);
  return res;

}

import filter from 'lodash/filter';
import keyBy from 'lodash/keyBy';
import flatten from 'lodash/flatten';
import uniq from 'lodash/uniq';
import map from 'lodash/map';
import escapeRegExp from 'lodash/escapeRegExp';
import orderBy from 'lodash/orderBy';

import Vue from 'vue';

import ArticleGroup from '@/models/ArticleGroup';
import Article from '@/models/Article';
import ArticlePicture from '@/models/ArticlePicture';
import ArticlePictureArticle from '@/models/ArticlePictureArticle';

import log from 'sistemium-telegram/services/log';

const { debug, error } = log('catalogue');

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
  await Promise.all(apa.map(({ pictureId }) => ArticlePicture.find(pictureId)));
  return ArticlePictureArticle.filter(where)
    .map(({ pictureId }) => ArticlePicture.get(pictureId));
}


export function getArticle(id) {
  return Article.get(id);
}

export function getArticles(ids) {
  return Article.getMany(ids);
}


export function getArticleGroup(id) {
  return ArticleGroup.get(id);
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


export function catalogueData(currentArticleGroup, searchText, filteredGroups) {

  const { id: articleGroupId = null, children = [] } = currentArticleGroup || {};

  let groups = null;

  if (children.length || !articleGroupId) {
    groups = filter(filteredGroups, g => g.articleGroupId === articleGroupId);
    // debug('bindCurrent', groups.length, articleGroupId, children.length);
  } else {
    groups = orderBy(currentArticleGroup.parent.children, 'name');
  }

  const articles = articlesByGroupID(currentArticleGroup, searchText) || [];

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
    articles,
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
  Vue.set(article, 'articleSameId', null);
  return Article.safeSave(article);
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
    sameArticle.articleSameId = articleSameId;
    return Article.safeSave(sameArticle);
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

function searchArticles(articles, search) {

  if (!search) {
    return articles;
  }

  const re = new RegExp(escapeRegExp(search), 'i');
  return filter(articles, a => re.test(a.name));

}

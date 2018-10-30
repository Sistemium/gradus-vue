import intersection from 'lodash/intersection';
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

  const fetchParams = {
    limit: 1500,
  };

  await ArticleGroup.fetchAll(fetchParams);

  await ArticlePicture.fetchAll(fetchParams);

  await Article.fetchAll(fetchParams);

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


export function articlesByGroupID(articleGroup, filters) {

  if (!articleGroup) {
    return filterArticles(Article.filter(), filters);
  }

  const ids = keyBy(flatten(filter(map(articleGroup.descendants(), 'children'))), 'id');
  ids[articleGroup.id] = articleGroup;
  return filterArticles(
    orderBy(filter(Article.filter(), ({ articleGroupId }) => ids[articleGroupId]), 'name'),
    filters,
  );

}

export function articleGroupsBySearch(search) {

  const articles = filterArticles(Article.filter({ articleSameId: null }), search);
  debug('articleGroupsBySearch:articles', articles.length);

  const groupIds = uniq(map(articles, 'articleGroupId'));
  const groupsWithArticles = filter(groupIds.map(id => ArticleGroup.get(id)));

  const parents = groupsWithArticles.map(item => map(item.ancestors(), 'id'));
  const parentsWithArticlesIDs = uniq(flatten(parents));

  debug('articleGroupsBySearch', search, parentsWithArticlesIDs.length);

  return orderBy(parentsWithArticlesIDs.map(id => ArticleGroup.get(id)), 'name');

}


export function catalogueData(currentArticleGroup, filters, filteredGroups) {

  const { id: articleGroupId = null, children = [] } = currentArticleGroup || {};

  let groups = null;

  if (children.length || !articleGroupId) {
    groups = filter(filteredGroups, g => g.articleGroupId === articleGroupId);
    // debug('bindCurrent', groups.length, articleGroupId, children.length);
  } else {
    groups = orderBy(intersection(currentArticleGroup.parent.children, filteredGroups), 'name');
  }

  const articles = articlesByGroupID(currentArticleGroup, filters) || [];

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
  return Article.update(article, { articleSameId: null });
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
    return Article.update(sameArticle, { articleSameId });
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

  const { searchText, imageFilter } = filters;

  if (!searchText && !imageFilter) {

    return articles;

  }

  const re = searchText && new RegExp(escapeRegExp(searchText), 'i');

  return filter(articles, a => (!re || re.test(a.name)) && (!imageFilter || a.avatarPicture));

}

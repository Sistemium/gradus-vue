import axios from 'axios';
import VuexORM from '@vuex-orm/core';
import VuexORMAxios from '@vuex-orm/plugin-axios';

import log from 'sistemium-telegram/services/log';

import Article from '@/models2/Article';
import ArticleGroup from '@/models2/ArticleGroup';
import ArticlePicture from '@/models2/ArticlePicture';

const { debug } = log('vuex-orm');

export function authAxios(authorization, { org }) {

  debug('authAxios', authorization);

  VuexORM.use(VuexORMAxios, {
    axios,
    baseURL: `/api/${org}`,
    headers: { authorization, 'x-page-size': 100000 },
  });

}

export default function () {

  const database = new VuexORM.Database();

  database.register(Article);
  database.register(ArticleGroup);
  database.register(ArticlePicture);

  return VuexORM.install(database);

}

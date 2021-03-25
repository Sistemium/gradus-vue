export default [
  {
    path: '/catalogue',
    name: 'catalogue',
    component: () => import(/* webpackChunkName: "catalogue" */ '../views/Catalogue.vue'),
    meta: {
      label: 'Каталог',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      label: 'Помощь',
    },
  },
  {
    path: '/targets/:groupId?',
    name: 'targets',
    component: () => import(/* webpackChunkName: "salesTargets" */ '../views/SalesTargets.vue'),
    meta: {
      label: 'Задачи',
    },
  },
];

export default [
  {
    path: '/possibleOutlets',
    name: 'PossibleOutlets',
    component: () => import(/* webpackChunkName: "outlets" */ '../views/PossibleOutletsPage.vue'),
    meta: {
      label: 'Проверка точек',
    },
    children: [{
      name: 'PossibleOutletDialog',
      path: ':outletId',
      component: () => import(/* webpackChunkName: "outlets" */ '../views/PossibleOutletDialog.vue'),
    }],
  },
];

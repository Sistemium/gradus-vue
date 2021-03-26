export default [
  {
    path: '/perfectShop',
    name: 'PerfectShop',
    component: () => import(/* webpackChunkName: "perfectShop" */ '../views/PerfectShop.vue'),
    meta: {
      label: 'Perfect Shop',
    },
    children: [{
      name: 'PerfectShopStatsDialog',
      path: ':statId',
      component: () => import('../components/perfectShop/PerfectShopStatsDialog.vue'),
    }],
  },
];

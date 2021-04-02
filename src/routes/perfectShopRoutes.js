export default [
  {
    path: '/perfectShop',
    name: 'PerfectShopRoot',
    component: () => import(/* webpackChunkName: "perfectShop" */ '../views/PerfectShop.vue'),
    meta: {
      label: 'Perfect Shop',
    },
    children: [{
      path: ':monthId',
      name: 'PerfectShop',
      component: () => import('../views/RoutePass'),
      children: [{
        name: 'PerfectShopStatsDialog',
        path: ':statId',
        component: () => import('../components/perfectShop/PerfectShopStatsDialog.vue'),
      }],
    }],
  },
];

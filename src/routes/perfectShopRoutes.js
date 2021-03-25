export default [
  {
    path: '/perfectShop',
    name: 'PerfectShop',
    component: () => import(/* webpackChunkName: "catalogue" */ '../views/PerfectShop.vue'),
    meta: {
      label: 'Perfect Shop',
    },
  },
];

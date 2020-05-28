export default {
  path: '/campaigns/:monthId?/:campaignId?',
  name: 'campaigns',
  component: () => import(/* webpackChunkName: "campaigns" */ '../views/Campaigns.vue'),
  meta: {
    label: 'Акции',
  },
  children: [{
    name: 'campaignActionCreate',
    path: 'action/create',
    props: ({ params }) => ({
      // actionId: params.actionId,
      from: {
        name: 'campaigns',
        params: { ...params },
      },
    }),
    component: () =>
      import(/* webpackChunkName: "campaigns" */ '../components/campaigns/CampaignActionEdit.vue'),
  }, {
    name: 'campaignActionEdit',
    path: 'action/:actionId/edit',
    props: ({ params }) => ({
      actionId: params.actionId,
      from: {
        name: 'campaigns',
        params: { ...params },
      },
    }),
    component: () =>
      import(/* webpackChunkName: "campaigns" */ '../components/campaigns/CampaignActionEdit.vue'),
  }],
};

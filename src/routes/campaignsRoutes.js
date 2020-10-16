export default [{

  path: '/campaigns/:monthId?/:campaignId?',
  name: 'campaigns',

  component: () => import(/* webpackChunkName: "campaigns" */ '../views/Campaigns.vue'),

  meta: {
    label: 'Акции',
  },

  children: [{
    name: 'campaignsPriorities',
    path: 'priorities',
  }, {
    name: 'campaignActionCreate',
    path: 'action/create',
    props: ({ params, query }) => ({
      // actionId: params.actionId,
      from: {
        name: 'campaigns',
        params: { ...params },
        query: { ...query },
      },
      forceModified: true,
    }),
    children: [{
      path: 'paste',
      name: 'campaignActionPaste',
    }],
    component: () => import(/* webpackChunkName: "campaigns" */ '../components/campaigns/CampaignActionEdit.vue'),
  }, {
    name: 'campaignActionEdit',
    path: 'action/:actionId/edit',
    props: ({ params, query }) => ({
      actionId: params.actionId,
      from: {
        name: 'campaigns',
        params: { ...params },
        query: { ...query },
      },
    }),
    component: () => import(/* webpackChunkName: "campaigns" */ '../components/campaigns/CampaignActionEdit.vue'),
  }, {
    name: 'actionPicturesEdit',
    path: 'action/:actionId/pictures',
    props: ({ params, query }) => ({
      actionId: params.actionId,
      from: {
        name: 'campaigns',
        params: { ...params },
        query: { ...query },
      },
    }),
    component: () => import(/* webpackChunkName: "campaigns" */ '../components/actions/ActionPicturesEdit.vue'),
  }],

}];

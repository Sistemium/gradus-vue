export default [{

  path: '/campaigns/:monthId?/:campaignId?',
  name: 'campaigns',

  component: () => import(/* webpackChunkName: "campaigns" */ '../views/Campaigns.vue'),

  meta: {
    label: 'Акции',
  },

  children: [
    {
      name: 'campaignsPriorities',
      path: 'priorities',
    }, {
      name: 'campaignActionCreate',
      path: 'action/create',
      props: fromProps({ forceModified: true }),
      children: [{
        path: 'paste',
        name: 'campaignActionPaste',
      }],
      component: () => import(/* webpackChunkName: "campaigns" */ '../components/campaigns/CampaignActionEdit.vue'),
    }, {
      name: 'campaignActionEdit',
      path: 'action/:actionId/edit',
      props: fromProps(),
      component: () => import(/* webpackChunkName: "campaigns" */ '../components/campaigns/CampaignActionEdit.vue'),
    }, {
      name: 'campaignActionPicture',
      path: 'action/:actionId/picture',
      props: fromProps(),
      component: () => import(/* webpackChunkName: "campaigns" */ '../components/campaigns/CampaignActionPicture.vue'),
    }, {
      name: 'actionPicturesEdit',
      path: 'action/:actionId/pictures',
      props: fromProps(),
      component: () => import(/* webpackChunkName: "campaigns" */ '../components/actions/ActionPicturesEdit.vue'),
    },
  ],

}, {
  name: 'ActionSingleView',
  path: '/actionSingle/:actionId',
  component: () => import(/* webpackChunkName: "campaigns" */ '../views/ActionSingleView.vue'),
  props: true,
  meta: {
    hideMenu: true,
  },
}];


function fromProps(extra = {}) {
  return ({ params, query }) => ({
    actionId: params.actionId,
    from: {
      name: 'campaigns',
      params: { ...params },
      query: { ...query },
    },
    ...extra,
  });
}

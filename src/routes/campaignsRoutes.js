// import RoutePassThrough from '@/lib/RoutePassThrough.vue';

export default [{

  path: '/campaigns/:monthId?',
  name: 'campaigns',
  props: true,

  component: () => import(/* webpackChunkName: "campaigns" */ '../views/Campaigns.vue'),

  meta: {
    label: 'Акции',
  },

  children: [
    {
      path: 'campaign/:campaignId',
      name: 'campaign',
      component: () => import(/* webpackChunkName: "campaigns" */ '../views/CampaignMainView.vue'),
      children: campaignChildren(),
      props: true,
    },
    {
      path: 'priorities/:priorityId',
      name: 'campaignsPriorities',
      component: () => import(/* webpackChunkName: "campaigns" */ '../views/PriorityActionsPage.vue'),
      props: true,
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
    from: {
      name: 'campaign',
      params: {
        ...params,
        actionId: undefined,
      },
      query: { ...query },
    },
    ...extra,
    actionId: params.actionId,
  });
}


function campaignChildren() {

  return [
    {
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
  ];

}

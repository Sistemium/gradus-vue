export default {
  path: '/campaigns/:monthId?/:campaignId?',
  name: 'campaigns',
  component: () => import(/* webpackChunkName: "campaigns" */ '../views/Campaigns.vue'),
  meta: {
    label: 'Акции',
  },
  children: [{
    name: 'campaignGallery',
    path: 'gallery',
    // component: () =>
    // import(/* webpackChunkName: "campaigns" */ '../components/campaigns/CampaignPicturesDialog'),
  }],
};

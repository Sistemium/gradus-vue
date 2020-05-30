import Campaign from '@/models/Campaign';
import CampaignPicture from '@/models/CampaignPicture';
import Action from '@/models/Action';
import escapeRegExp from 'lodash/escapeRegExp';
import filter from 'lodash/filter';
import orderBy from 'lodash/orderBy';
import map from 'lodash/map';
import flatten from 'lodash/flatten';
import chunk from 'lodash/chunk';
import uniq from 'lodash/uniq';
import { monthToWhere } from '@/lib/dates';

async function findByMany(model, ids, options = {}) {

  const { chunkSize = 100, field = 'id' } = options;

  const chunks = chunk(uniq(ids), chunkSize);

  return Promise.all(chunks.map(chunkIds => {
    const where = { [field]: { in: chunkIds } };
    return model.findAll({ where });
  }))
    .then(flatten);

}

/**
 *
 * @param {String} month
 * @param {String} searchText
 * @returns {*}
 */
export async function campaignsData(month, searchText) {

  const fetchParams = {
    limit: 1500,
    'where:': monthToWhere(month),
  };

  const campaigns = await Campaign.findAll(fetchParams, {
    // force: true,
    with: ['CampaignPicture'],
  });

  const campaignIds = filter(flatten(map(campaigns, 'id')));

  await findByMany(Action, campaignIds, { field: 'campaignId' });

  return campaignsFilter(month, searchText);

}

function campaignsFilter(monthId, searchText) {

  const campaigns = Campaign.getAll();
  const re = searchText && new RegExp(escapeRegExp(searchText), 'i');
  const monthB = `${monthId}-01`;
  const monthE = `${monthId}-31`;

  return filter(campaigns, ({ dateB, dateE, name }) => {
    if (dateB > monthE || dateE < monthB) {
      return false;
    }
    return !re || re.test(name);
  });

}

/**
 *
 * @param {Array} ids
 * @returns {Array}
 */
export function getCampaigns(ids) {
  return orderBy(Campaign.getMany(ids), 'name');
}

/**
 *
 * @param {String} id
 * @returns {Object}
 */
export function getCampaign(id) {
  return Campaign.get(id);
}

/**
 *
 * @param {Object} campaign
 * @returns {Promise}
 */
export function saveCampaign(campaign) {

  if (campaign.id) {

    return Campaign.update(campaign, campaign);

  }

  return Campaign.create(campaign);

}

export function getCampaignPicturesByCampaign(campaign, force = false) {
  return CampaignPicture.findAll({ campaignId: campaign.id }, { force });
}

/**
 *
 * @param {Array} ids
 * @returns {Array}
 */
export function getCampaignPictures(ids) {
  return CampaignPicture.getMany(ids);
}

export function removeCampaignPicture(picture) {

  return CampaignPicture.destroy(picture);

}

export function removeCampaign(campaign) {

  return Campaign.destroy(campaign);

}

export function campaignGroups() {
  return [
    {
      label: 'ОП',
      value: 'op',
      order: 1,
    },
    {
      label: 'МВЗ',
      value: 'mvz',
      order: 2,
    },
    {
      label: 'Общие',
      value: 'common',
      order: 0,
    },
  ];
}

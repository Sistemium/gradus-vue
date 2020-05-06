import Campaign from '@/models/Campaign';
import CampaignPicture from '@/models/CampaignPicture';
import escapeRegExp from 'lodash/escapeRegExp';
import filter from 'lodash/filter';
import orderBy from 'lodash/orderBy';

/**
 *
 * @param {String} month
 * @param {String} searchText
 * @returns {*}
 */
export async function campaignsData(month, searchText) {

  const fetchParams = {
    limit: 1500,
    month,
  };

  await Campaign.findAll(fetchParams, {
    // force: true,
    with: ['CampaignPicture'],
  });

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

export function getCampaignPicturesByCampaign(campaign) {
  return CampaignPicture.findAll({ campaignId: campaign.id });
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

/* eslint-disable import/prefer-default-export */
import Campaign from '@/models/Campaign';
import CampaignPicture from '@/models/CampaignPicture';
import escapeRegExp from 'lodash/escapeRegExp';
import filter from 'lodash/filter';

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

  const campaigns = await Campaign.findAll(fetchParams, { force: true });

  const re = searchText && new RegExp(escapeRegExp(searchText), 'i');

  return filter(campaigns, campaign => (!re || re.test(campaign.name)));

}

/**
 *
 * @param {Array} ids
 * @returns {Array}
 */
export function getCampaigns(ids) {
  return Campaign.getMany(ids);
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

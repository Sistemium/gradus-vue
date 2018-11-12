/* eslint-disable import/prefer-default-export */
import Campaign from '@/models/Campaign';
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

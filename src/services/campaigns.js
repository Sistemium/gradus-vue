/* eslint-disable import/prefer-default-export */
import Campaign from '@/models/Campaign';

/**
 *
 * @param {String} month
 * @returns {*}
 */
export function campaignsData(month) {

  const fetchParams = {
    limit: 1500,
    month,
  };

  return Campaign.findAll(fetchParams, { force: true });

}

/**
 *
 * @param {Array} ids
 * @returns {Array}
 */
export function getCampaigns(ids) {
  return Campaign.getMany(ids);
}

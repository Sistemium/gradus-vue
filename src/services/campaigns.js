/* eslint-disable import/prefer-default-export */
import Campaign from '@/models/Campaign';

export async function loadData() {

  const fetchParams = {
    limit: 1500,
  };

  await Campaign.fetchAll(fetchParams);

}

export function campaignsData(searchText, month) {

  const fetchParams = {
    limit: 1500,
    month,
  };

  return Campaign.fetchAll(fetchParams);

}

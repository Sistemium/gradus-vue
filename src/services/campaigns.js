/* eslint-disable import/prefer-default-export */
import Campaign from '@/models/Campaign';

export async function loadData() {

  const fetchParams = {
    limit: 1500,
  };

  await Campaign.fetchAll(fetchParams);

}

// export async function campaignsData(searchText, selectedDate) {
//
//   const fetchParams = {
//     limit: 1500,
//   };
//
//   await Campaign.fetchAll(fetchParams);
//
// }

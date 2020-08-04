import Campaign from '@/models/Campaign';
import CampaignPicture from '@/models/CampaignPicture';
import Action from '@/models/Action';
import ActionHistory from '@/models/ActionHistory';
import escapeRegExp from 'lodash/escapeRegExp';
import filter from 'lodash/filter';
import orderBy from 'lodash/orderBy';
import map from 'lodash/map';
import find from 'lodash/find';
import flatten from 'lodash/flatten';
import { findByMany } from '@/lib/modelExtentions';
import { monthToWhere } from '@/lib/dates';
import Workflow from '@/lib/Workflow';

function mapIds(data) {
  return filter(flatten(map(data, 'id')));
}

/**
 *
 * @param {String} month
 * @param {String} searchText
 * @returns {*}
 */
export async function campaignsData(month, searchText, force = false) {

  const fetchParams = {
    limit: 1500,
    'where:': monthToWhere(month),
  };

  const campaigns = await Campaign.findAll(fetchParams, {
    force,
    with: ['CampaignPicture'],
  });

  const campaignIds = mapIds(campaigns);

  if (campaignIds.length) {
    const actions = await findByMany(Action, campaignIds, {
      field: 'campaignId',
      force,
    });
    await CampaignPicture.findAll({ where: { campaignId: { '==': campaignIds } } }, { force });
    if (actions.length) {
      await findByMany(ActionHistory, mapIds(actions), {
        field: 'actionId',
        force,
      });
    }
  }

  return campaignsFilter(month, searchText);

}

function campaignsFilter(monthId, searchText) {

  const campaigns = Campaign.getAll();
  const re = searchText && new RegExp(escapeRegExp(searchText), 'i');
  const monthB = `${monthId}-01`;
  const monthE = `${monthId}-31`;

  return filter(campaigns, campaign => {

    const { dateB, dateE, name } = campaign;

    if (dateB > monthE || dateE < monthB) {
      return false;
    }

    let res = !re || re.test(name);

    if (!res) {
      res = !!find(campaign.actions, a => re.test(a.name));
    }

    return res;
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

  const filterPictures = {
    where: { campaignId: { '==': campaign && campaign.id } },
    orderBy: [['ts', 'ASC'], ['id', 'ASC']],
  };

  if (!force) {
    return CampaignPicture.filter(filterPictures);
  }

  return CampaignPicture.findAll(filterPictures, { force });

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
      label: 'ЦФО',
      value: 'cfo',
      order: 3,
    }, {
      label: 'Общие',
      value: 'common',
      order: 0,
    },
  ];
}

export const campaignWorkflow = new Workflow({
  default: 'draft',
  options: [
    {
      processing: 'draft',
      label: 'Черновик',
      options: [{
        to: 'published',
        label: 'Опубликовать',
      }],
      style: 'primary',
      primaryOption: 'published',
      editable: true,
    },
    {
      processing: 'published',
      label: 'Опубликовано',
      options: [{
        to: 'archived',
        label: 'В архив',
      }],
      primaryOption: null,
      editable: 'history',
    },
    {
      processing: 'archived',
      label: 'В архиве',
      options: [{
        to: 'published',
        label: 'Опубликовать снова',
      }],
      style: 'info',
      primaryOption: null,
    },
  ],
});

export async function updateCampaign(campaign, props) {
  return Campaign.update(campaign, props);
}

import Campaign from '@/models/Campaign';
import CampaignPicture from '@/models/CampaignPicture';
import CampaignsPriority from '@/models/CampaignsPriority';
import Action from '@/models/Action';
import SalesTeam from '@/models/SalesTeam';
import ActionHistory from '@/models/ActionHistory';
// import ArticlePicture from '@/models/ArticlePicture';
import escapeRegExp from 'lodash/escapeRegExp';
import filter from 'lodash/filter';
import orderBy from 'lodash/orderBy';
import map from 'lodash/map';
import find from 'lodash/find';
import flatten from 'lodash/flatten';
import { monthToWhere, serverTimestamp } from '@/lib/dates';
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

  await SalesTeam.findAll();
  await CampaignsPriority.findAll();

  const campaigns = await Campaign.findAll(fetchParams, {
    force,
    with: ['CampaignPicture'],
  });

  const campaignIds = mapIds(campaigns);

  if (campaignIds.length) {
    const actions = await Action.findByMany(campaignIds, {
      field: 'campaignId',
      force,
    });
    await CampaignPicture.findAll({ where: { campaignId: { '==': campaignIds } } }, { force });
    if (actions.length) {
      await ActionHistory.findByMany(mapIds(actions), {
        field: 'actionId',
        force,
      });
      // const articlePictureIds = flatten(map(actions, 'articlePictureIds'));
      // await ArticlePicture.findByMany(articlePictureIds);
    }
  }

  return campaignsFilter(month, searchText);

}

function campaignsFilter(monthId, searchText) {

  const campaigns = Campaign.getAll();
  const re = searchText && new RegExp(escapeRegExp(searchText), 'i');
  const monthB = `${monthId}-01`;
  const monthE = `${monthId}-31`;

  const statuses = searchToProcessing(searchText);

  return filter(campaigns, campaign => {

    const { dateB, dateE, name } = campaign;

    if (dateB > monthE || dateE < monthB) {
      return false;
    }

    if (statuses.length) {
      return statuses.includes(campaign.processing);
    }

    let res = !re || re.test(name);

    if (!res) {
      res = !!find(campaign.actions, a => re.test(a.name));
    }

    return res;
  });

}


export function searchToProcessing(searchText) {
  if (/на утверждени[еи]/i.test(searchText)) {
    return ['draft', 'published'];
  }
  if (/черновики?/i.test(searchText)) {
    return ['draft'];
  }
  return [];
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
export async function saveCampaign(campaign) {

  if (campaign.id) {
    return Campaign.update(campaign, campaign);
  }

  const { actions, pictures } = campaign;
  const saved = await Campaign.create({
    ...campaign,
    actions: undefined,
    pictures: undefined,
  });

  if (actions) {
    await Promise.all(map(actions, async action => Action.create({
      ...action,
      campaignId: saved.id,
    })));
  }

  if (pictures) {
    await Promise.all(map(pictures, async picture => CampaignPicture.create({
      ...picture,
      campaignId: saved.id,
    })));
  }

  return saved;

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

  const res = SalesTeam.getAll()
    .map(t => ({
      label: t.name,
      value: t.id,
      order: t.ord,
    }));

  return orderBy(res, 'order');

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
      }, {
        to: 'draft',
        label: 'Отменить публикацию',
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

export async function touchCampaignPictures(campaign) {
  return Promise.all(map(campaign.pictures, picture => CampaignPicture.update(picture, {
    timestamp: serverTimestamp(),
  })));
}


export function campaignsPriorities() {
  return orderBy(CampaignsPriority.getAll(), ['ord', 'id']);
}

export function campaignsPriorityById(priorityId) {
  return priorityId && CampaignsPriority.get(priorityId);
}

export function campaignsWithPriorityActions(campaigns, priorityId) {
  return filter(campaigns, ({ actions }) => find(actions, { priorityId }));
}

export function prioritiesOfCampaigns(campaigns) {
  return campaignsPriorities()
    .filter(({ id }) => campaignsWithPriorityActions(campaigns, id).length);
}

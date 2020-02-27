import map from 'lodash/map';
import * as g from './getters';

export const SET_BUSY = `SET_${g.BUSY}`;
export const SET_SELECTED_MONTH = `SET_${g.SELECTED_MONTH}`;
export const SET_SEARCH_TEXT = `SET_${g.SEARCH_TEXT}`;
export const SET_CAMPAIGNS = `SET_${g.CAMPAIGNS}`;

export const SET_GALLERY_CAMPAIGN = `SET_${g.GALLERY_CAMPAIGN}`;
export const SET_GALLERY_PICTURES = `SET_${g.GALLERY_PICTURES}`;

export const SET_GALLERY_PICTURE = `SET_${g.ACTIVE_GALLERY_PICTURE}`;

export default {

  [SET_BUSY](state, isBusy) {
    state[g.BUSY] = !!isBusy;
  },

  [SET_SEARCH_TEXT](state, text) {
    state[g.SEARCH_TEXT] = text || '';
  },

  [SET_SELECTED_MONTH](state, date) {
    state[g.SELECTED_MONTH] = date;
  },

  [SET_CAMPAIGNS](state, campaigns) {
    state[g.CAMPAIGNS] = map(campaigns, 'id');
  },

  [SET_GALLERY_CAMPAIGN](state, campaign) {
    state[g.GALLERY_CAMPAIGN] = campaign && campaign.id;
  },

  [SET_GALLERY_PICTURES](state, pictures) {
    state[g.GALLERY_PICTURES] = map(pictures, 'id');
  },

  [SET_GALLERY_PICTURE](state, picture) {
    state[g.ACTIVE_GALLERY_PICTURE] = picture && picture.id;
  },

};

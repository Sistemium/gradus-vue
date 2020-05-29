import Vue from 'vue';
import round from 'lodash/round';

Vue.filter('number', numberFilter);

function numberFilter(value, decimals = 0) {
  return value && round(value, decimals);
}

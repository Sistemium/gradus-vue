import Vue from 'vue';
import round from 'lodash/round';

Vue.filter('number', numberFilter);
Vue.filter('decimal', decimalFilter);

function numberFilter(value, decimals = 0) {
  return value && round(value, decimals);
}

function decimalFilter(value, maxDecimals = 6, zeroSign = '-') {
  if (!value) {
    return zeroSign;
  }
  const res = (value || 0).toFixed(maxDecimals);
  if (!res.match(/\./)) {
    return res;
  }
  return res.replace(/0+$/g, '')
    .replace(/\.$/, '');
}

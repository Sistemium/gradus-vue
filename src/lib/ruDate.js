import Vue from 'vue';
import { dateFormat } from 'sistemium-telegram/services/moments';

Vue.filter('ruDate', ruDateFilter);

function ruDateFilter(value) {
  return value && dateFormat(value);
}

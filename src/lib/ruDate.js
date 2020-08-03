import Vue from 'vue';
import { dateFormat, dateTimeFormat } from 'sistemium-telegram/services/moments';

Vue.filter('ruDate', ruDateFilter);

function ruDateFilter(value) {
  return value && dateFormat(value);
}

Vue.filter('ruDateTime', ruDateTimeFilter);

function ruDateTimeFilter(value) {
  return value && dateTimeFormat(value);
}

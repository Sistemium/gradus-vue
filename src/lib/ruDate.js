import Vue from 'vue';
import dayjs from 'dayjs';

Vue.filter('ruDate', ruDateFilter);

export function ruDateFilter(value) {
  return value && dayjs(value)
    .format('DD.MM.YYYY');
}

Vue.filter('ruDateTime', ruDateTimeFilter);

export function ruDateTimeFilter(value) {
  return value && dayjs(value)
    .format('DD.MM.YYYY в HH:mm');
}

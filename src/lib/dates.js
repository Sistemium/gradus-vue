import dayjs from 'dayjs';

require('dayjs/locale/ru');

export function addMonths(date, months = 1) {
  return dayjs(date)
    .add(months, 'month')
    .format('YYYY-MM-DD');
}

export function currentMonth() {
  return dayjs()
    .format('YYYY-MM');
}

export function monthToWhere(monthId) {

  const {
    dateE,
    dateB,
  } = dateBE(monthId);

  return {
    dateB: { '<=': dateE },
    dateE: { '>=': dateB },
  };

}

export function dateBE(monthId) {
  const dateB = `${monthId}-01`;
  const dateE = dayjs(dateB)
    .add(1, 'month')
    .add(-1, 'day')
    .format('YYYY-MM-DD');
  return {
    dateE,
    dateB,
  };
}

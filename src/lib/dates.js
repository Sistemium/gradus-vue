import dayjs from 'dayjs';

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

  const monthB = `${monthId}-01`;
  const monthE = dayjs(monthB)
    .add(1, 'month')
    .add(-1, 'day')
    .format('YYYY-MM-DD');

  return {
    dateB: {
      '<=': monthE,
    },
    dateE: {
      '>=': monthB,
    },
  };

}

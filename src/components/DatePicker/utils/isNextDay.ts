import * as  moment from 'moment';

import isSameDay from './isSameDay';

export default function isNextDay(a:any, b:any) {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
  const nextDay = moment(a).add(1, 'day');
  return isSameDay(nextDay, b);
}

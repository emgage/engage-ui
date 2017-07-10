import * as  moment from 'moment';

import isAfterDay from './isAfterDay';

export default function isInclusivelyBeforeDay(a:any, b:any) {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
  return !isAfterDay(a, b);
}

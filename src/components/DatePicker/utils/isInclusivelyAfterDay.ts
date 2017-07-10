import * as  moment from 'moment';

import isBeforeDay from './isBeforeDay';

export default function isInclusivelyAfterDay(a:any, b:any) {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
  return !isBeforeDay(a, b);
}

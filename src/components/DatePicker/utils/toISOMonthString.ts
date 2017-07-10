import * as  moment from 'moment';

import toMomentObject from './toMomentObject';

import Constants from '../Component/constants';

export default function toISOMonthString(date: any, currentFormat :any) {
  const dateObj: any = moment.isMoment(date) ? date : toMomentObject(date, currentFormat);
  if (!dateObj) return null;

  return dateObj.format(Constants.ISO_MONTH_FORMAT);//ISO_MONTH_FORMAT
}

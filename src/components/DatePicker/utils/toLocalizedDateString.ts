import * as moment from 'moment';

import toMomentObject from './toMomentObject';

import  Constants from '../Component/constants';

export default function toLocalizedDateString(date:Date, currentFormat: any) {
  const dateObj = moment.isMoment(date) ? date : toMomentObject(date, currentFormat);
  if (!dateObj) return null;

  return dateObj.format(Constants.DISPLAY_FORMAT);
}

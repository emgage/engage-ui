import * as  moment from 'moment';

import toMomentObject from './toMomentObject';

import  Constants from '../Component/constants';

export default function toISODateString(date:any, currentFormat:any) {
  const dateObj = moment.isMoment(date) ? date : toMomentObject(date, currentFormat);
  if (!dateObj) return null;

  return dateObj.format(Constants.ISO_FORMAT);
}

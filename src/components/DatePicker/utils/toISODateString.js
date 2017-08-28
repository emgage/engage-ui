import moment from 'moment';

import toMomentObject from './toMomentObject';

import { ISO_FORMAT } from '../Constants';

export default function toISODateString(date, currentFormat) {
  const dateObj = moment.isMoment(date) ? date : toMomentObject(date, currentFormat);
  if (!dateObj) return null;

  return dateObj.format(ISO_FORMAT);
}

import * as  moment from 'moment';

import Constants from '../Component/constants';

export default function toMomentObject(dateString:any, customFormat:any) {
  const dateFormats = customFormat ?
    [customFormat, Constants.DISPLAY_FORMAT, Constants.ISO_FORMAT] :
    [Constants.DISPLAY_FORMAT, Constants.ISO_FORMAT];

  const date = moment(dateString, dateFormats, true);
  return date.isValid() ? date.hour(12) : null;
}

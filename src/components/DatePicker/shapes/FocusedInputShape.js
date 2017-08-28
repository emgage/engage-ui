import PropTypes from 'prop-types';

import {
  START_DATE,
  END_DATE,
} from '../Constants';

export default PropTypes.oneOf([START_DATE, END_DATE]);

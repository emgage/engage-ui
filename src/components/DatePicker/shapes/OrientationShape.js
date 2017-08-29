import PropTypes from 'prop-types';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
} from '../Constants';

export default PropTypes.oneOf([HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION]);

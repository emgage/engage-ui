/* eslint-disable react/no-unused-prop-types */
import * as React from 'react';
//import PropTypes from 'prop-types';
//import momentPropTypes from 'react-moment-proptypes';
//import { forbidExtraProps } from 'airbnb-prop-types';
import * as  moment from 'moment';
import omit from 'lodash/omit';

import DayPickerSingleDateController from './Component/DayPickerSingleDateController';
//import { defaultProps as DayPickerDefaultProps } from './Component/DayPicker';

//import ScrollableOrientationShape from './shapes/ScrollableOrientationShape';

import constants from './Component/constants';
import isInclusivelyAfterDay from './utils/isInclusivelyAfterDay';

// const propTypes = ({
//   // example props for the demo
//   autoFocus: PropTypes.bool,
//   initialDate: momentPropTypes.momentObj,
//   showInput: PropTypes.bool,

//   keepOpenOnDateSelect: PropTypes.bool,
//   minimumNights: PropTypes.number,
//   isOutsideRange: PropTypes.func,
//   isDayBlocked: PropTypes.func,
//   isDayHighlighted: PropTypes.func,

//   // DayPicker props
//   enableOutsideDays: PropTypes.bool,
//   numberOfMonths: PropTypes.number,
//   orientation: ScrollableOrientationShape,
//   withPortal: PropTypes.bool,
//   initialVisibleMonth: PropTypes.func,
//   renderCalendarInfo: PropTypes.func,

//   navPrev: PropTypes.node,
//   navNext: PropTypes.node,

//   onPrevMonthClick: PropTypes.func,
//   onNextMonthClick: PropTypes.func,
//   onOutsideClick: PropTypes.func,
//   renderDay: PropTypes.func,

//   // i18n
//   monthFormat: PropTypes.string,

//   isRTL: PropTypes.bool,
// });

export interface Props {
  autoFocusEndDate?: any,
  initialStartDate?: any,
  initialEndDate?: any,

  keepOpenOnDateSelect?: any,
  minimumNights?: any,
  isOutsideRange?: any,
  isDayBlocked?: any,
  isDayHighlighted?: any,

  // DayPicker props
  enableOutsideDays?: any,
  numberOfMonths?: any,
  orientation?: any,
  withPortal?: any,
  initialVisibleMonth?: Function,
  renderCalendarInfo?: any,

  navPrev?: any,
  navNext?: any,

  onPrevMonthClick?: any,
  onNextMonthClick?: any,
  onOutsideClick?: any,
  renderDay?: any,

  // i18n
  monthFormat?: any,

  isRTL?: any,

  autoFocus?: any,
  initialDate?: any,
  showInput?: any,


}
export interface State { }



class DayPickerSingleDateControllerWrapper extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      focused: true,
      date: props.initialDate,
    };

    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  static defaultProps = {
    // example props for the demo
    autoFocus: false,
    initialDate: null,
    showInput: false,

    // day presentation and interaction related props
    renderDay: null,
    minimumNights: 1,
    isDayBlocked: () => false,
    isOutsideRange: (day: any) => !isInclusivelyAfterDay(day, moment()),
    isDayHighlighted: () => false,
    enableOutsideDays: false,

    // calendar presentation and interaction related props
    orientation: constants.HORIZONTAL_ORIENTATION,
    withPortal: false,
    initialVisibleMonth: {},
    numberOfMonths: 2,
    onOutsideClick() { },
    keepOpenOnDateSelect: false,
    renderCalendarInfo: null,
    isRTL: false,

    // navigation related props
    navPrev: null,
    navNext: null,
    onPrevMonthClick() { },
    onNextMonthClick() { },

    // internationalization
    monthFormat: 'MMMM YYYY',
  };

  onDateChange(date: any) {
    this.setState({ date });
  }

  onFocusChange() {
    // Force the focused states to always be truthy so that date is always selectable
    this.setState({ focused: true });
  }

  render() {
    const { showInput } = this.props;
    const { focused, date }: any = this.state;

    const props = omit(this.props, [
      'autoFocus',
      'initialDate',
      'showInput',
    ]);

    const dateString = date && date.format('YYYY-MM-DD');

    return (
      <div>
        {showInput &&
          <div style={{ marginBottom: 16 }}>
            <input type="text" name="start date" value={dateString || ''} readOnly />
          </div>
        }

        <DayPickerSingleDateController
          {...props}
          onDateChange={this.onDateChange}
          onFocusChange={this.onFocusChange}
          focused={focused}
          date={date}
        />
      </div>
    );
  }
}

// DayPickerSingleDateControllerWrapper.propTypes = propTypes;
// DayPickerSingleDateControllerWrapper.defaultProps = defaultProps;

export default DayPickerSingleDateControllerWrapper;

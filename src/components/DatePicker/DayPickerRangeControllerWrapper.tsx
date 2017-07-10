/* eslint-disable react/no-unused-prop-types */
import * as React from 'react';
// import PropTypes from 'prop-types';
// import momentPropTypes from 'react-moment-proptypes';
// import { forbidExtraProps } from 'airbnb-prop-types';
import * as moment from 'moment';
//import omit from 'lodash/omit';

import DayPickerRangeController from './Component/DayPickerRangeController';
//import  {defaultProps as DayPickerDefaultProps}  from './Component/DayPicker';

//import ScrollableOrientationShape from './shapes/ScrollableOrientationShape';

import constants from './Component/constants';
import isInclusivelyAfterDay from './utils/isInclusivelyAfterDay';

// const propTypes = ({
//   // example props for the demo
//   autoFocusEndDate: PropTypes.bool,
//   initialStartDate: momentPropTypes.momentObj,
//   initialEndDate: momentPropTypes.momentObj,

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



export interface Props{
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
}
export interface State{}

class DayPickerRangeControllerWrapper extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      focusedInput: props.autoFocusEndDate ? constants.END_DATE : constants.START_DATE,
      startDate: props.initialStartDate,
      endDate: props.initialEndDate,
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  static defaultProps = {
  // example props for the demo
  autoFocusEndDate: false,
  initialStartDate: null,
  initialEndDate: null,

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
  onOutsideClick() {},
  keepOpenOnDateSelect: false,
  renderCalendarInfo: null,
  isRTL: false,

  // navigation related props
  navPrev: null,
  navNext: null,
  onPrevMonthClick() {},
  onNextMonthClick() {},

  // internationalization
  monthFormat: 'MMMM YYYY',
};

  onDatesChange({ startDate, endDate }: any) {
    this.setState({ startDate, endDate });
  }

  onFocusChange(focusedInput: any) {
    this.setState({
      // Force the focusedInput to always be truthy so that dates are always selectable
      focusedInput: !focusedInput ? constants.START_DATE : focusedInput,
    });
  }

  render() {
    const { showInputs }: any = this.props;
    const { focusedInput, startDate, endDate }: any = this.state;

    // const props = omit(this.props, [
    //   'autoFocus',
    //   'autoFocusEndDate',
    //   'initialStartDate',
    //   'initialEndDate',
    // ]);

    const props = (this.props);

    const startDateString = startDate && startDate.format('YYYY-MM-DD');
    const endDateString = endDate && endDate.format('YYYY-MM-DD');

    return (
      <div>
        {showInputs &&
          <div style={{ marginBottom: 16 }}>
            <input type="text" name="start date" value={startDateString} readOnly />
            <input type="text" name="end date" value={endDateString} readOnly />
          </div>
        }

        <DayPickerRangeController
          {...props}
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    );
  }
}

// DayPickerRangeControllerWrapper.propTypes = propTypes;
// DayPickerRangeControllerWrapper.defaultProps = defaultProps;

export default DayPickerRangeControllerWrapper;

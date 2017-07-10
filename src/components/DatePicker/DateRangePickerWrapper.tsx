import * as  React from 'react';
//import PropTypes from 'prop-types';
// import momentPropTypes from 'react-moment-proptypes';
import * as moment from 'moment';
//import  omit from 'lodash/omit';

import DateRangePicker from './Component/DateRangePicker';

import  DateRangePickerPhrases  from './Component/defaultPhrases';
//import DateRangePickerShape from './shapes/DateRangePickerShape';
import constants from './Component/constants';
import isInclusivelyAfterDay from './utils/isInclusivelyAfterDay';

export interface Props{
  autoFocus?: any,
  autoFocusEndDate?: any,
  initialStartDate?: any,
  initialEndDate?: any,
}
export interface State{}

// const propTypes = {
//   // example props for the demo
//   autoFocus: PropTypes.bool,
//   autoFocusEndDate: PropTypes.bool,
//   initialStartDate: momentPropTypes.momentObj,
//   initialEndDate: momentPropTypes.momentObj,

//   ...omit(DateRangePickerShape, [
//     'startDate',
//     'endDate',
//     'onDatesChange',
//     'focusedInput',
//     'onFocusChange',
//   ]),
// };



class DateRangePickerWrapper extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    let focusedInput = null;
    if (props.autoFocus) {
      focusedInput = constants.START_DATE;
    } else if (props.autoFocusEndDate) {
      focusedInput = constants.END_DATE;
    }

    this.state = {
      focusedInput,
      startDate: props.initialStartDate,
      endDate: props.initialEndDate,
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  static defaultProps = {
  // example props for the demo
  autoFocus: false,
  autoFocusEndDate: false,
  initialStartDate: null,
  initialEndDate: null,

  // input related props
  startDateId: constants.START_DATE,
  startDatePlaceholderText: 'Start Date',
  endDateId: constants.END_DATE,
  endDatePlaceholderText: 'End Date',
  disabled: false,
  required: false,
  screenReaderInputMessage: '',
  showClearDates: false,
  showDefaultInputIcon: false,
  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,

  // calendar presentation and interaction related props
  renderMonth: null,
  orientation: constants.HORIZONTAL_ORIENTATION,
  anchorDirection: constants.ANCHOR_LEFT,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDates: false,
  isRTL: false,

  // navigation related props
  navPrev: null,
  navNext: null,
  onPrevMonthClick() {},
  onNextMonthClick() {},

  // day presentation and interaction related props
  renderDay: null,
  minimumNights: 1,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isOutsideRange: (day: any) => !isInclusivelyAfterDay(day, moment()),
  isDayHighlighted: () => false,

  // internationalization
  displayFormat: () => moment.localeData().longDateFormat('L'),
  monthFormat: 'MMMM YYYY',
  phrases: DateRangePickerPhrases,
};

  onDatesChange({ startDate, endDate }: any) {
    this.setState({ startDate, endDate });
  }

  onFocusChange(focusedInput: any) {
    this.setState({ focusedInput });
  }

  render() {
    const { focusedInput, startDate, endDate }: any = this.state;

    // autoFocus, autoFocusEndDate, initialStartDate and initialEndDate are helper props for the
    // example wrapper but are not props on the SingleDatePicker itself and
    // thus, have to be omitted.
    // const props = omit(this.props, [
    //   'autoFocus',
    //   'autoFocusEndDate',
    //   'initialStartDate',
    //   'initialEndDate',
    // ]);

    const props = (this.props);

    return (
      <div>
        <DateRangePicker
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

// DateRangePickerWrapper.propTypes = propTypes;
// DateRangePickerWrapper.defaultProps = defaultProps;

export default DateRangePickerWrapper;

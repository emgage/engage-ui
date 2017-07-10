import * as  React from 'react';
//import PropTypes from 'prop-types';
// import momentPropTypes from 'react-moment-proptypes';
import * as moment from 'moment';
//import omit from 'lodash/omit';

import SingleDatePicker from './Component/SingleDatePicker';

import  SingleDatePickerPhrases  from './Component/defaultPhrases';
//import SingleDatePickerShape from './shapes/SingleDatePickerShape';
import constants from './Component/constants';
import isInclusivelyAfterDay from './utils/isInclusivelyAfterDay';


export interface Props{
  autoFocus?: any,
  initialDate?: any,
}
export interface State{}

// const propTypes = {
//   // example props for the demo
//   autoFocus: PropTypes.bool,
//   initialDate: momentPropTypes.momentObj,

//   ...omit(SingleDatePickerShape, [
//     'date',
//     'onDateChange',
//     'focused',
//     'onFocusChange',
//   ]),
// };



class SingleDatePickerWrapper extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      focused: props.autoFocus,
      date: props.initialDate,
    };

    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  static defaultProps = {
  // example props for the demo
  autoFocus: false,
  initialDate: null,

  // input related props
  id: 'date',
  placeholder: 'Date',
  disabled: false,
  required: false,
  screenReaderInputMessage: '',
  showClearDate: false,
  showDefaultInputIcon: false,
  customInputIcon: null,

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
  reopenPickerOnClearDate: false,
  isRTL: false,

  // navigation related props
  navPrev: null,
  navNext: null,
  onPrevMonthClick() {},
  onNextMonthClick() {},

  // day presentation and interaction related props
  renderDay: null,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isOutsideRange: (day: any) => !isInclusivelyAfterDay(day, moment()),
  isDayHighlighted: () => {},

  // internationalization props
  displayFormat: () => moment.localeData().longDateFormat('L'),
  monthFormat: 'MMMM YYYY',
  phrases: SingleDatePickerPhrases,
};

  onDateChange(date: any) {
    this.setState({ date });
  }

  onFocusChange({ focused }: any) {
    this.setState({ focused });
  }

  render() {
    const { focused, date }: any = this.state;

    // autoFocus and initialDate are helper props for the example wrapper but are not
    // props on the SingleDatePicker itself and thus, have to be omitted.
    const props = (this.props);
    // const props = _omit(this.props, [
    //   'autoFocus',
    //   'initialDate',
    // ]);

    return (
      <SingleDatePicker
        {...props}
        id="date_input"
        date={date}
        focused={focused}
        onDateChange={this.onDateChange}
        onFocusChange={this.onFocusChange}
      />
    );
  }
}

// SingleDatePickerWrapper.propTypes = propTypes;
// SingleDatePickerWrapper.defaultProps = defaultProps;

export default SingleDatePickerWrapper;

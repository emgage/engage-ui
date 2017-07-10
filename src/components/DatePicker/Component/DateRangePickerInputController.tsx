import * as React from 'react';
// import PropTypes from 'prop-types';
import * as moment from 'moment';

// import momentPropTypes from 'react-moment-proptypes';
// import { forbidExtraProps } from 'airbnb-prop-types';

import  DateRangePickerInputPhrases  from './defaultPhrases';
// import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import DateRangePickerInput from './DateRangePickerInput';

import toMomentObject from '../utils/toMomentObject';
import toLocalizedDateString from '../utils/toLocalizedDateString';
import toISODateString from '../utils/toISODateString';

import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';
import isInclusivelyBeforeDay from '../utils/isInclusivelyBeforeDay';
import Constants from './constants';
// import { START_DATE, END_DATE } from '../../constants';



export interface State {}
export interface Props {
  onFocusChange?: any, 
  onClose?: any, 
  startDate?: any, 
  endDate?: any,
  isOutsideRange?: any,
      keepOpenOnDateSelect?: any,
      onDatesChange?: any,
      withFullScreenPortal?: any, 
      disabled?: any,
      displayFormat?: any,
      reopenPickerOnClearDates?: any,
      startDateId?: any,
      startDatePlaceholderText?: any,
      isStartDateFocused?: any,
      endDateId?: any,
      endDatePlaceholderText?: any,
      isEndDateFocused?: any,
      screenReaderMessage?: any,
      showClearDates?: any,
      showCaret?: any,
      showDefaultInputIcon?: any,
      customInputIcon?: any,
      customArrowIcon?: any,
      customCloseIcon?: any,
      required?: any,
      readOnly?: any,
      isFocused?: any,
      phrases?: any,
      onArrowDown?: any,
      onQuestionMark?: any,
      isRTL?: any,
   }

export default class DateRangePickerInputController extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.onClearFocus = this.onClearFocus.bind(this);
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onStartDateFocus = this.onStartDateFocus.bind(this);
    this.onEndDateChange = this.onEndDateChange.bind(this);
    this.onEndDateFocus = this.onEndDateFocus.bind(this);
    this.clearDates = this.clearDates.bind(this);
  }

//   static propTypes = ({
//   startDate: PropTypes.object,
//   startDateId: PropTypes.string,
//   startDatePlaceholderText: PropTypes.string,
//   isStartDateFocused: PropTypes.bool,

//   endDate: PropTypes.number,
//   endDateId: PropTypes.string,
//   endDatePlaceholderText: PropTypes.string,
//   isEndDateFocused: PropTypes.bool,

//   screenReaderMessage: PropTypes.string,
//   showClearDates: PropTypes.bool,
//   showCaret: PropTypes.bool,
//   showDefaultInputIcon: PropTypes.bool,
//   disabled: PropTypes.bool,
//   required: PropTypes.bool,
//   readOnly: PropTypes.bool,

//   keepOpenOnDateSelect: PropTypes.bool,
//   reopenPickerOnClearDates: PropTypes.bool,
//   withFullScreenPortal: PropTypes.bool,
//   isOutsideRange: PropTypes.func,
//   displayFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

//   onFocusChange: PropTypes.func,
//   onClose: PropTypes.func,
//   onDatesChange: PropTypes.func,
//   onArrowDown: PropTypes.func,
//   onQuestionMark: PropTypes.func,

//   customInputIcon: PropTypes.node,
//   customArrowIcon: PropTypes.node,
//   customCloseIcon: PropTypes.node,

//   // accessibility
//   isFocused: PropTypes.bool,

//   // i18n
//   phrases: PropTypes.shape(getPhrasePropTypes(DateRangePickerInputPhrases)),

//   isRTL: PropTypes.bool,
// });

static defaultProps = {
  startDate: null,
  startDateId: Constants.START_DATE,
  startDatePlaceholderText: 'Start Date',
  isStartDateFocused: false,

  endDate: null,
  endDateId: Constants.END_DATE,
  endDatePlaceholderText: 'End Date',
  isEndDateFocused: false,

  screenReaderMessage: '',
  showClearDates: false,
  showCaret: false,
  showDefaultInputIcon: false,
  disabled: false,
  required: false,
  readOnly: false,

  keepOpenOnDateSelect: false,
  reopenPickerOnClearDates: false,
  withFullScreenPortal: false,
  isOutsideRange: (day:any) => !isInclusivelyAfterDay(day, moment()),
  displayFormat: () => moment.localeData().longDateFormat('L'),

  onFocusChange() {},
  onClose() {},
  onDatesChange() {},
  onArrowDown() {},
  onQuestionMark() {},

  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,

  // accessibility
  isFocused: false,

  // i18n
  phrases: DateRangePickerInputPhrases,

  isRTL: false,
};

  onClearFocus() {
    const { onFocusChange, onClose, startDate, endDate } = this.props;

    onFocusChange(null);
    onClose({ startDate, endDate });
  }

  onEndDateChange(endDateString: any) {
    const {
      startDate,
      isOutsideRange,
      keepOpenOnDateSelect,
      onDatesChange,
    } = this.props;

    const endDate = toMomentObject(endDateString, this.getDisplayFormat());

    const isEndDateValid = endDate && !isOutsideRange(endDate) &&
      !isInclusivelyBeforeDay(endDate, startDate);
    if (isEndDateValid) {
      onDatesChange({ startDate, endDate });
      if (!keepOpenOnDateSelect) this.onClearFocus();
    } else {
      onDatesChange({
        startDate,
        endDate: null,
      });
    }
  }

  onEndDateFocus() {
    const { startDate, onFocusChange, withFullScreenPortal, disabled } = this.props;

    if (!startDate && withFullScreenPortal && !disabled) {
      // When the datepicker is full screen, we never want to focus the end date first
      // because there's no indication that that is the case once the datepicker is open and it
      // might confuse the user
      onFocusChange(Constants.START_DATE);
    } else if (!disabled) {
      onFocusChange(Constants.END_DATE);
    }
  }

  onStartDateChange(startDateString: any) {
    const startDate = toMomentObject(startDateString, this.getDisplayFormat());

    let { endDate } = this.props;
    const { isOutsideRange, onDatesChange, onFocusChange } = this.props;
    const isStartDateValid = startDate && !isOutsideRange(startDate);
    if (isStartDateValid) {
      if (isInclusivelyBeforeDay(endDate, startDate)) {
        endDate = null;
      }

      onDatesChange({ startDate, endDate });
      onFocusChange(Constants.END_DATE);
    } else {
      onDatesChange({
        startDate: null,
        endDate,
      });
    }
  }

  onStartDateFocus() {
    if (!this.props.disabled) {
      this.props.onFocusChange(Constants.START_DATE);
    }
  }

  getDisplayFormat() {
    const { displayFormat } = this.props;
    return typeof displayFormat === 'string' ? displayFormat : displayFormat();
  }

  getDateString(date: any) {
    const displayFormat = this.getDisplayFormat();
    if (date && displayFormat) {
      return date && date.format(displayFormat);
    }
    return toLocalizedDateString(date, null);
  }

  clearDates() {
    const { onDatesChange, reopenPickerOnClearDates, onFocusChange } = this.props;
    onDatesChange({ startDate: null, endDate: null });
    if (reopenPickerOnClearDates) {
      onFocusChange(Constants.START_DATE);
    }
  }

  render() {
    const {
      startDate,
      startDateId,
      startDatePlaceholderText,
      isStartDateFocused,
      endDate,
      endDateId,
      endDatePlaceholderText,
      isEndDateFocused,
      screenReaderMessage,
      showClearDates,
      showCaret,
      showDefaultInputIcon,
      customInputIcon,
      customArrowIcon,
      customCloseIcon,
      disabled,
      required,
      readOnly,
      isFocused,
      phrases,
      onArrowDown,
      onQuestionMark,
      isRTL,
    } = this.props;

    const startDateString = this.getDateString(startDate);
    const startDateValue = toISODateString(startDate, null);
    const endDateString = this.getDateString(endDate);
    const endDateValue = toISODateString(endDate, null);

    return (
      <DateRangePickerInput
        startDate={startDateString}
        startDateValue={startDateValue}
        startDateId={startDateId}
        startDatePlaceholderText={startDatePlaceholderText}
        isStartDateFocused={isStartDateFocused}
        endDate={endDateString}
        endDateValue={endDateValue}
        endDateId={endDateId}
        endDatePlaceholderText={endDatePlaceholderText}
        isEndDateFocused={isEndDateFocused}
        isFocused={isFocused}
        disabled={disabled}
        required={required}
        readOnly={readOnly}
        showCaret={showCaret}
        showDefaultInputIcon={showDefaultInputIcon}
        customInputIcon={customInputIcon}
        customArrowIcon={customArrowIcon}
        customCloseIcon={customCloseIcon}
        phrases={phrases}
        onStartDateChange={this.onStartDateChange}
        onStartDateFocus={this.onStartDateFocus}
        onStartDateShiftTab={this.onClearFocus}
        onEndDateChange={this.onEndDateChange}
        onEndDateFocus={this.onEndDateFocus}
        onEndDateTab={this.onClearFocus}
        showClearDates={showClearDates}
        onClearDates={this.clearDates}
        screenReaderMessage={screenReaderMessage}
        onArrowDown={onArrowDown}
        onQuestionMark={onQuestionMark}
        isRTL={isRTL}
      />
    );
  }
}

// DateRangePickerInputController.propTypes = propTypes;
// DateRangePickerInputController.defaultProps = defaultProps;

import * as React from 'react';
//import PropTypes from 'prop-types';
// import { forbidExtraProps } from 'airbnb-prop-types';
import * as cx from 'classnames';

import  DateRangePickerInputPhrases  from './defaultPhrases';
//import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import DateInput from './DateInput';
import RightArrow from '../svg/arrow-right.svg';
import LeftArrow from '../svg/arrow-left.svg';
import CloseButton from '../svg/close.svg';
import CalendarIcon from '../svg/calendar.svg';
import Constants from './constants';

import './../style/DateRangePickerInput.scss';


export interface State {
  isClearDatesHovered: any
}
export interface Props {
   startDate?: any,
      startDateValue?: any,
      startDateId?: any,
      startDatePlaceholderText?: any,
      screenReaderMessage?: any,
      isStartDateFocused?: any,
      onStartDateChange?: any,
      onStartDateFocus?: any,
      onStartDateShiftTab?: any,
      endDate?: any,
      endDateValue?: any,
      endDateId?: any,
      endDatePlaceholderText?: any,
      isEndDateFocused?: any,
      onEndDateChange?: any,
      onEndDateFocus?: any,
      onEndDateTab?: any,
      onArrowDown?: any,
      onQuestionMark?: any,
      onClearDates?: any,
      showClearDates?: any,
      disabled?: any,
      required?: any,
      readOnly?: any,
      showCaret?: any,
      showDefaultInputIcon?: any,
      customInputIcon?: any,
      customArrowIcon?: any,
      customCloseIcon?: any,
      isFocused?: any,
      phrases?: any,
      isRTL?: any,
}

export default class DateRangePickerInput extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isClearDatesHovered: false,
    };

    this.onClearDatesMouseEnter = this.onClearDatesMouseEnter.bind(this);
    this.onClearDatesMouseLeave = this.onClearDatesMouseLeave.bind(this);
  }

//   static propTypes = ({
//   startDateId: PropTypes.string,
//   startDatePlaceholderText: PropTypes.string,
//   screenReaderMessage: PropTypes.string,

//   endDateId: PropTypes.string,
//   endDatePlaceholderText: PropTypes.string,

//   onStartDateFocus: PropTypes.func,
//   onEndDateFocus: PropTypes.func,
//   onStartDateChange: PropTypes.func,
//   onEndDateChange: PropTypes.func,
//   onStartDateShiftTab: PropTypes.func,
//   onEndDateTab: PropTypes.func,
//   onClearDates: PropTypes.func,
//   onArrowDown: PropTypes.func,
//   onQuestionMark: PropTypes.func,

//   startDate: PropTypes.string,
//   startDateValue: PropTypes.string,
//   endDate: PropTypes.string,
//   endDateValue: PropTypes.string,

//   isStartDateFocused: PropTypes.bool,
//   isEndDateFocused: PropTypes.bool,
//   showClearDates: PropTypes.bool,
//   disabled: PropTypes.bool,
//   required: PropTypes.bool,
//   readOnly: PropTypes.bool,
//   showCaret: PropTypes.bool,
//   showDefaultInputIcon: PropTypes.bool,
//   customInputIcon: PropTypes.node,
//   customArrowIcon: PropTypes.node,
//   customCloseIcon: PropTypes.node,

//   // accessibility
//   isFocused: PropTypes.bool, // describes actual DOM focus

//   // i18n
//   phrases: PropTypes.shape(getPhrasePropTypes(DateRangePickerInputPhrases)),

//   isRTL: PropTypes.bool,
// });

static defaultProps = {
  startDateId: Constants.START_DATE,
  endDateId: Constants.END_DATE,
  startDatePlaceholderText: 'Start Date',
  endDatePlaceholderText: 'End Date',
  screenReaderMessage: '',
  onStartDateFocus() {},
  onEndDateFocus() {},
  onStartDateChange() {},
  onEndDateChange() {},
  onStartDateShiftTab() {},
  onEndDateTab() {},
  onClearDates() {},
  onArrowDown() {},
  onQuestionMark() {},

  startDate: '',
  startDateValue: '',
  endDate: '',
  endDateValue: '',

  isStartDateFocused: false,
  isEndDateFocused: false,
  showClearDates: false,
  disabled: false,
  required: false,
  readOnly: false,
  showCaret: false,
  showDefaultInputIcon: false,
  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,

  // accessibility
  isFocused: false,

  // i18n
  phrases: DateRangePickerInputPhrases,

  isRTL: false,
};

  onClearDatesMouseEnter() {
    this.setState({
      isClearDatesHovered: true,
    });
  }

  onClearDatesMouseLeave() {
    this.setState({
      isClearDatesHovered: false,
    });
  }

  render() {
    const { isClearDatesHovered } = this.state;
    const {
      startDate,
      startDateValue,
      startDateId,
      startDatePlaceholderText,
      screenReaderMessage,
      isStartDateFocused,
      onStartDateChange,
      onStartDateFocus,
      onStartDateShiftTab,
      endDate,
      endDateValue,
      endDateId,
      endDatePlaceholderText,
      isEndDateFocused,
      onEndDateChange,
      onEndDateFocus,
      onEndDateTab,
      onArrowDown,
      onQuestionMark,
      onClearDates,
      showClearDates,
      disabled,
      required,
      readOnly,
      showCaret,
      showDefaultInputIcon,
      customInputIcon,
      customArrowIcon,
      customCloseIcon,
      isFocused,
      phrases,
      isRTL,
    } = this.props;

    const inputIcon = customInputIcon || (<CalendarIcon />);
    const arrowIcon = customArrowIcon || (isRTL ? <LeftArrow /> : <RightArrow />);
    const closeIcon = customCloseIcon || (<CloseButton />);
    const screenReaderText = screenReaderMessage || phrases.keyboardNavigationInstructions;

    return (
      <div
        className={cx('DateRangePickerInput', {
          'DateRangePickerInput--disabled': disabled,
          'DateRangePickerInput--rtl': isRTL,
        })}
      >
        {(showDefaultInputIcon || customInputIcon !== null) && (
          <button
            type="button"
            className="DateRangePickerInput__calendar-icon"
            disabled={disabled}
            aria-label={phrases.focusStartDate}
            onClick={onArrowDown}
          >
            {inputIcon}
          </button>
        )}

        <DateInput
          id={startDateId}
          placeholder={startDatePlaceholderText}
          displayValue={startDate}
          inputValue={startDateValue}
          screenReaderMessage={screenReaderText}
          focused={isStartDateFocused}
          isFocused={isFocused}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          showCaret={showCaret}
          onChange={onStartDateChange}
          onFocus={onStartDateFocus}
          onKeyDownShiftTab={onStartDateShiftTab}
          onKeyDownArrowDown={onArrowDown}
          onKeyDownQuestionMark={onQuestionMark}
        />

        <div
          className="DateRangePickerInput__arrow"
          aria-hidden="true"
          role="presentation"
        >
          {arrowIcon}
        </div>

        <DateInput
          id={endDateId}
          placeholder={endDatePlaceholderText}
          displayValue={endDate}
          inputValue={endDateValue}
          screenReaderMessage={screenReaderText}
          focused={isEndDateFocused}
          isFocused={isFocused}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          showCaret={showCaret}
          onChange={onEndDateChange}
          onFocus={onEndDateFocus}
          onKeyDownTab={onEndDateTab}
          onKeyDownArrowDown={onArrowDown}
          onKeyDownQuestionMark={onQuestionMark}
        />

        {showClearDates && (
          <button
            type="button"
            aria-label={phrases.clearDates}
            className={cx('DateRangePickerInput__clear-dates', {
              'DateRangePickerInput__clear-dates--hide': !(startDate || endDate),
              'DateRangePickerInput__clear-dates--hover': isClearDatesHovered,
            })}
            onMouseEnter={this.onClearDatesMouseEnter}
            onMouseLeave={this.onClearDatesMouseLeave}
            onClick={onClearDates}
          >
            <div className="DateRangePickerInput__close-icon">
              {closeIcon}
            </div>
          </button>
        )}
      </div>
    );
  }
}

// DateRangePickerInput.propTypes = propTypes;
// DateRangePickerInput.defaultProps = defaultProps;

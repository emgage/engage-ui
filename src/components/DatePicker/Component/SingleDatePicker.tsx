import * as React from 'react';

import * as moment from 'moment';
import * as cx from 'classnames';
// import Portal from 'react-portal';
// import { forbidExtraProps } from 'airbnb-prop-types';
import { addEventListener, removeEventListener } from 'consolidated-events';
// import isTouchDevice from 'is-touch-device';

// import SingleDatePickerShape from '../shapes/SingleDatePickerShape';
import  SingleDatePickerPhrases  from './defaultPhrases';

import OutsideClickHandler from './OutsideClickHandler';
import toMomentObject from '../utils/toMomentObject';
import toLocalizedDateString from '../utils/toLocalizedDateString';
import getResponsiveContainerStyles from '../utils/getResponsiveContainerStyles';

import toISODateString from '../utils/toISODateString';

import SingleDatePickerInput from './SingleDatePickerInput';
import DayPickerSingleDateController from './DayPickerSingleDateController';

import CloseButton from '../svg/close.svg';

import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';
import Constants from './constants';



export interface State {}
export interface Props {
  focused?: any,
  id?: any,
      placeholder?: any,
      disabled?: any,
      required?: any,
      readOnly?: any,
      showClearDate?: any,
      showDefaultInputIcon?: any,
      customInputIcon?: any,
      date?: any,
      phrases?: any,
      withPortal?: any,
      withFullScreenPortal?: any,
      screenReaderInputMessage?: any,
      isRTL?: any,
      onDateChange?: any,
      onFocusChange?: any,
      enableOutsideDays?: any,
      numberOfMonths?: any,
      orientation?: any,
      monthFormat?: any,
      navPrev?: any,
      navNext?: any,
      initialVisibleMonth?: Function,
      renderMonth?: any,
      renderDay?: any,
      renderCalendarInfo?: any,
      hideKeyboardShortcutsPanel?: any,
      customCloseIcon?: any,
      daySize?: any,
      isOutsideRange?: any,
      isDayBlocked?: any,
      isDayHighlighted?: any,
}

export default class SingleDatePicker extends React.Component<Props, State> {
  dayPickerContainer: any;
  isTouchDevice: boolean;
  resizeHandle: any;
  constructor(props: any) {
    super(props);

    this.isTouchDevice = false;

    this.state = {
      dayPickerContainerStyles: {},
      isDayPickerFocused: false,
      isInputFocused: false,
    };

    this.onDayPickerFocus = this.onDayPickerFocus.bind(this);
    this.onDayPickerBlur = this.onDayPickerBlur.bind(this);

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onClearFocus = this.onClearFocus.bind(this);
    this.clearDate = this.clearDate.bind(this);

    this.responsivizePickerPosition = this.responsivizePickerPosition.bind(this);
  }


//  static propTypes = (SingleDatePickerShape);

static defaultProps = {
  // required props for a functional interactive SingleDatePicker
  date: null,
  focused: false,

  // input related props
  id: 'date',
  placeholder: 'Date',
  disabled: false,
  required: false,
  readOnly: false,
  screenReaderInputMessage: '',
  showClearDate: false,
  showDefaultInputIcon: false,
  customInputIcon: null,
  customCloseIcon: null,

  // calendar presentation and interaction related props
  orientation: Constants.HORIZONTAL_ORIENTATION,
  anchorDirection: Constants.ANCHOR_LEFT,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDate: false,
  renderCalendarInfo: null,
  hideKeyboardShortcutsPanel: false,
  daySize: Constants.DAY_SIZE,
  isRTL: false,

  // navigation related props
  navPrev: null,
  navNext: null,

  onPrevMonthClick() {},
  onNextMonthClick() {},
  onClose() {},

  // month presentation and interaction related props
  renderMonth: null,

  // day presentation and interaction related props
  renderDay: null,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isOutsideRange: (day: any) => !isInclusivelyAfterDay(day, moment()),
  isDayHighlighted: () => {},

  // internationalization props
  displayFormat: () => {},     //moment.localeData().longDateFormat('L'),
  monthFormat: 'MMMM YYYY',
  phrases: SingleDatePickerPhrases,
};

  /* istanbul ignore next */
  componentDidMount() {
    this.resizeHandle = addEventListener(
      window,
      'resize',
      this.responsivizePickerPosition,
    { passive: true },
    );
    this.responsivizePickerPosition();

    if (this.props.focused) {
      this.setState({
        isInputFocused: true,
      });
    }

    this.isTouchDevice = false;  //isTouchDevice()
  }

  componentDidUpdate(prevProps: any) {
    if (!prevProps.focused && this.props.focused) {
      this.responsivizePickerPosition();
    }
  }

  /* istanbul ignore next */
  componentWillUnmount() {
    removeEventListener(this.resizeHandle);
  }

  onChange(dateString: any) {
    const {
      isOutsideRange,
      keepOpenOnDateSelect,
      onDateChange,
      onFocusChange,
      onClose,
    }: any = this.props;
    const newDate = toMomentObject(dateString, this.getDisplayFormat());

    const isValid = newDate && !isOutsideRange(newDate);
    if (isValid) {
      onDateChange(newDate);
      if (!keepOpenOnDateSelect) {
        onFocusChange({ focused: false });
        onClose({ date: newDate });
      }
    } else {
      onDateChange(null);
    }
  }

  onFocus() {
    const { disabled, onFocusChange, withPortal, withFullScreenPortal }: any = this.props;

    const moveFocusToDayPicker = withPortal || withFullScreenPortal || this.isTouchDevice;
    if (moveFocusToDayPicker) {
      this.onDayPickerFocus();
    } else {
      this.onDayPickerBlur();
    }

    if (!disabled) {
      onFocusChange({ focused: true });
    }
  }

  onClearFocus() {
    const { startDate, endDate, focused, onFocusChange, onClose }: any = this.props;
    if (!focused) return;

    this.setState({
      isInputFocused: false,
      isDayPickerFocused: false,
    });

    onFocusChange({ focused: false });
    onClose({ startDate, endDate });
  }

  onDayPickerFocus() {
    this.setState({
      isInputFocused: false,
      isDayPickerFocused: true,
    });
  }

  onDayPickerBlur() {
    this.setState({
      isInputFocused: true,
      isDayPickerFocused: false,
    });
  }

  getDateString(date: any) {
    const displayFormat: any = this.getDisplayFormat();
    if (date && displayFormat) {
      return date && date.format(displayFormat);
    }
    return toLocalizedDateString(date, null);
  }

  getDayPickerContainerClasses() {
    const { orientation, withPortal, withFullScreenPortal, anchorDirection, isRTL }: any = this.props;

    const dayPickerClassName = cx('SingleDatePicker__picker', {
      'SingleDatePicker__picker--direction-left': anchorDirection === Constants.ANCHOR_LEFT,
      'SingleDatePicker__picker--direction-right': anchorDirection === Constants.ANCHOR_RIGHT,
      'SingleDatePicker__picker--horizontal': orientation === Constants.HORIZONTAL_ORIENTATION,
      'SingleDatePicker__picker--vertical': orientation === Constants.VERTICAL_ORIENTATION,
      'SingleDatePicker__picker--portal': withPortal || withFullScreenPortal,
      'SingleDatePicker__picker--full-screen-portal': withFullScreenPortal,
      'SingleDatePicker__picker--rtl': isRTL,
    });

    return dayPickerClassName;
  }

  getDisplayFormat() {
    const { displayFormat }: any = this.props;
    return typeof displayFormat === 'string' ? displayFormat : displayFormat();
  }

  clearDate() {
    const { onDateChange, reopenPickerOnClearDate, onFocusChange }: any = this.props;
    onDateChange(null);
    if (reopenPickerOnClearDate) {
      onFocusChange({ focused: true });
    }
  }

  /* istanbul ignore next */
  responsivizePickerPosition() {
    const {
      anchorDirection,
      horizontalMargin,
      withPortal,
      withFullScreenPortal,
      focused,
    }: any = this.props;
    const { dayPickerContainerStyles }: any = this.state;

    if (!focused) {
      return;
    }

    const isAnchoredLeft = anchorDirection === Constants.ANCHOR_LEFT;

    if (!withPortal && !withFullScreenPortal) {
      const containerRect = this.dayPickerContainer.getBoundingClientRect();
      const currentOffset = dayPickerContainerStyles[anchorDirection] || 0;
      const containerEdge =
        isAnchoredLeft ? containerRect[Constants.ANCHOR_RIGHT] : containerRect[Constants.ANCHOR_LEFT];

      this.setState({
        dayPickerContainerStyles: getResponsiveContainerStyles(
          anchorDirection,
          currentOffset,
          containerEdge,
          horizontalMargin,
        ),
      });
    }
  }

  maybeRenderDayPickerWithPortal() {
    const { focused, withPortal, withFullScreenPortal } = this.props;

    if (!focused) {
      return null;
    }

    if (withPortal || withFullScreenPortal) {
      this.renderDayPicker();
      // return (
      //   <Portal isOpened>
      //     {this.renderDayPicker()}
      //   </Portal>
      // );
    }

    return this.renderDayPicker();
  }

  renderDayPicker() {
    const {
      onDateChange,
      date,
      onFocusChange,
      focused,
      enableOutsideDays,
      numberOfMonths,
      orientation,
      monthFormat,
      navPrev,
      navNext,
      withPortal,
      withFullScreenPortal,
      initialVisibleMonth,
      renderMonth,
      renderDay,
      renderCalendarInfo,
      hideKeyboardShortcutsPanel,
      customCloseIcon,
      phrases,
      daySize,
      isRTL,
      isOutsideRange,
      isDayBlocked,
      isDayHighlighted,
    } = this.props;
    const { dayPickerContainerStyles, isDayPickerFocused }: any = this.state;

    const onOutsideClick = (!withFullScreenPortal && withPortal) ? this.onClearFocus : undefined;
    const closeIcon = customCloseIcon || (<CloseButton />);

    return (
      <div // eslint-disable-line jsx-a11y/no-static-element-interactions
        ref={(ref) => { this.dayPickerContainer = ref; }}
        className={this.getDayPickerContainerClasses()}
        style={dayPickerContainerStyles}
        onClick={onOutsideClick}
      >
        <DayPickerSingleDateController
          date={date}
          onDateChange={onDateChange}
          onFocusChange={onFocusChange}
          orientation={orientation}
          enableOutsideDays={enableOutsideDays}
          numberOfMonths={numberOfMonths}
          monthFormat={monthFormat}
          withPortal={withPortal || withFullScreenPortal}
          focused={focused}
          hideKeyboardShortcutsPanel={hideKeyboardShortcutsPanel}
          initialVisibleMonth={initialVisibleMonth}
          navPrev={navPrev}
          navNext={navNext}
          renderMonth={renderMonth}
          renderDay={renderDay}
          renderCalendarInfo={renderCalendarInfo}
          isFocused={isDayPickerFocused}
          phrases={phrases}
          daySize={daySize}
          isRTL={isRTL}
          isOutsideRange={isOutsideRange}
          isDayBlocked={isDayBlocked}
          isDayHighlighted={isDayHighlighted}
        />

        {withFullScreenPortal && (
          <button
            aria-label={phrases.closeDatePicker}
            className="SingleDatePicker__close"
            type="button"
            onClick={this.onClearFocus}
          >
            <div className="SingleDatePicker__close-icon">
              {closeIcon}
            </div>
          </button>
        )}
      </div>
    );
  }

  render() {
    const {
      id,
      placeholder,
      disabled,
      focused,
      required,
      readOnly,
      showClearDate,
      showDefaultInputIcon,
      customInputIcon,
      date,
      phrases,
      withPortal,
      withFullScreenPortal,
      screenReaderInputMessage,
      isRTL,
    }: any = this.props;

    const { isInputFocused }: any = this.state;

    const displayValue = this.getDateString(date);
    const inputValue = toISODateString(date, null);

    const onOutsideClick = (!withPortal && !withFullScreenPortal) ? this.onClearFocus : undefined;

    return (
      <div className="SingleDatePicker">
        <OutsideClickHandler onOutsideClick={onOutsideClick}>
          <SingleDatePickerInput
            id={id}
            placeholder={placeholder}
            focused={focused}
            isFocused={isInputFocused}
            disabled={disabled}
            required={required}
            readOnly={readOnly}
            showCaret={!withPortal && !withFullScreenPortal}
            onClearDate={this.clearDate}
            showClearDate={showClearDate}
            showDefaultInputIcon={showDefaultInputIcon}
            customInputIcon={customInputIcon}
            displayValue={displayValue}
            inputValue={inputValue}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onKeyDownShiftTab={this.onClearFocus}
            onKeyDownTab={this.onClearFocus}
            onKeyDownArrowDown={this.onDayPickerFocus}
            screenReaderMessage={screenReaderInputMessage}
            phrases={phrases}
            isRTL={isRTL}
          />

          {this.maybeRenderDayPickerWithPortal()}
        </OutsideClickHandler>
      </div>
    );
  }
}

// SingleDatePicker.propTypes = propTypes;
// SingleDatePicker.defaultProps = defaultProps;

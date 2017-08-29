import React from 'react';
import ReactDOM from 'react-dom';
import shallowCompare from 'react-addons-shallow-compare';
import moment from 'moment';
import cx from 'classnames';
import Portal from 'react-portal';
import { forbidExtraProps } from 'airbnb-prop-types';
import { addEventListener, removeEventListener } from 'consolidated-events';
import isTouchDevice from 'is-touch-device';
import { themr } from 'react-css-themr';

import { DateRangePickerPhrases } from '../defaultPhrases';

import OutsideClickHandler from './OutsideClickHandler';
import getResponsiveContainerStyles from '../utils/getResponsiveContainerStyles';

import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';

import DateRangePickerInputController from './DateRangePickerInputController';
import DayPickerRangeController from './DayPickerRangeController';

import CloseButton from '../svg/close.svg';

import DateRangePickerShape from '../shapes/DateRangePickerShape';

import { DATEPICKER } from './../../ThemeIdentifiers';
import * as baseTheme from './../style/style.scss';

import {
  START_DATE,
  END_DATE,
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  ANCHOR_LEFT,
  ANCHOR_RIGHT,
  DAY_SIZE,
} from '../Constants';

const propTypes = forbidExtraProps(DateRangePickerShape);

const defaultProps = {
  // required props for a functional interactive DateRangePicker
  startDate: null,
  endDate: null,
  focusedInput: null,

  // input related props
  startDateId: START_DATE,
  startDatePlaceholderText: 'Start Date',
  endDateId: END_DATE,
  endDatePlaceholderText: 'End Date',
  disabled: false,
  required: false,
  readOnly: false,
  screenReaderInputMessage: '',
  showClearDates: false,
  showDefaultInputIcon: false,
  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,

  // calendar presentation and interaction related props
  renderMonth: null,
  orientation: HORIZONTAL_ORIENTATION,
  anchorDirection: ANCHOR_LEFT,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDates: false,
  renderCalendarInfo: null,
  hideKeyboardShortcutsPanel: false,
  daySize: DAY_SIZE,
  isRTL: false,
  firstDayOfWeek: null,

  // navigation related props
  navPrev: null,
  navNext: null,

  onPrevMonthClick() {},
  onNextMonthClick() {},

  onClose() {},

  // day presentation and interaction related props
  renderDay: null,
  minimumNights: 1,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
  isDayHighlighted: () => false,

  // internationalization
  displayFormat: () => moment.localeData().longDateFormat('L'),
  monthFormat: 'MMMM YYYY',
  phrases: DateRangePickerPhrases,
};

class DateRangePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dayPickerContainerStyles: {},
      isDateRangePickerInputFocused: false,
      isDayPickerFocused: false,
      showKeyboardShortcuts: false,
    };

    this.isTouchDevice = false;

    this.onOutsideClick = this.onOutsideClick.bind(this);
    this.onDateRangePickerInputFocus = this.onDateRangePickerInputFocus.bind(this);
    this.onDayPickerFocus = this.onDayPickerFocus.bind(this);
    this.onDayPickerBlur = this.onDayPickerBlur.bind(this);
    this.showKeyboardShortcutsPanel = this.showKeyboardShortcutsPanel.bind(this);

    this.responsivizePickerPosition = this.responsivizePickerPosition.bind(this);
  }

  componentDidMount() {
    this.resizeHandle = addEventListener(
      window,
      'resize',
      this.responsivizePickerPosition,
      { passive: true },
    );
    this.responsivizePickerPosition();

    if (this.props.focusedInput) {
      this.setState({
        isDateRangePickerInputFocused: true,
      });
    }

    this.isTouchDevice = isTouchDevice();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.focusedInput && this.props.focusedInput && this.isOpened()) {
      // The date picker just changed from being closed to being open.
      this.responsivizePickerPosition();
    }
  }

  componentWillUnmount() {
    if (this.resizeHandle) removeEventListener(this.resizeHandle);
  }

  onOutsideClick() {
    const { onFocusChange, onClose, startDate, endDate } = this.props;
    if (!this.isOpened()) return;

    this.setState({
      isDateRangePickerInputFocused: false,
      isDayPickerFocused: false,
      showKeyboardShortcuts: false,
    });

    onFocusChange(null);
    onClose({ startDate, endDate });
  }

  onDateRangePickerInputFocus(focusedInput) {
    const { onFocusChange, withPortal, withFullScreenPortal } = this.props;

    if (focusedInput) {
      const moveFocusToDayPicker = withPortal || withFullScreenPortal || this.isTouchDevice;
      if (moveFocusToDayPicker) {
        this.onDayPickerFocus();
      } else {
        this.onDayPickerBlur();
      }
    }

    onFocusChange(focusedInput);
  }

  onDayPickerFocus() {
    const { focusedInput, onFocusChange } = this.props;
    if (!focusedInput) onFocusChange(START_DATE);

    this.setState({
      isDateRangePickerInputFocused: false,
      isDayPickerFocused: true,
      showKeyboardShortcuts: false,
    });
  }

  onDayPickerBlur() {
    this.setState({
      isDateRangePickerInputFocused: true,
      isDayPickerFocused: false,
      showKeyboardShortcuts: false,
    });
  }

  getDayPickerContainerClasses() {
    const {
      orientation,
      withPortal,
      withFullScreenPortal,
      anchorDirection,
      isRTL,
      theme,
    } = this.props;

    const dayPickerClassName = cx(theme['DateRangePicker__picker'], {
      [theme['DateRangePicker__picker--direction-left']]: anchorDirection === ANCHOR_LEFT,
      [theme['DateRangePicker__picker--direction-right']]: anchorDirection === ANCHOR_RIGHT,
      [theme['DateRangePicker__picker--horizontal']]: orientation === HORIZONTAL_ORIENTATION,
      [theme['DateRangePicker__picker--vertical']]: orientation === VERTICAL_ORIENTATION,
      [theme['DateRangePicker__picker--portal']]: withPortal || withFullScreenPortal,
      [theme['DateRangePicker__picker--full-screen-portal']]: withFullScreenPortal,
      [theme['DateRangePicker__picker--rtl']]: isRTL,
    });

    return dayPickerClassName;
  }

  getDayPickerDOMNode() {
    return ReactDOM.findDOMNode(this.dayPicker); // eslint-disable-line react/no-find-dom-node
  }

  isOpened() {
    const { focusedInput } = this.props;
    return focusedInput === START_DATE || focusedInput === END_DATE;
  }

  responsivizePickerPosition() {
    if (!this.isOpened()) {
      return;
    }

    const { anchorDirection, horizontalMargin, withPortal, withFullScreenPortal } = this.props;
    const { dayPickerContainerStyles } = this.state;

    const isAnchoredLeft = anchorDirection === ANCHOR_LEFT;
    if (!withPortal && !withFullScreenPortal) {
      const containerRect = this.dayPickerContainer.getBoundingClientRect();
      const currentOffset = dayPickerContainerStyles[anchorDirection] || 0;
      const containerEdge =
        isAnchoredLeft ? containerRect[ANCHOR_RIGHT] : containerRect[ANCHOR_LEFT];

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

  showKeyboardShortcutsPanel() {
    this.setState({
      isDateRangePickerInputFocused: false,
      isDayPickerFocused: true,
      showKeyboardShortcuts: true,
    });
  }

  maybeRenderDayPickerWithPortal() {
    const { withPortal, withFullScreenPortal } = this.props;

    if (!this.isOpened()) {
      return null;
    }

    if (withPortal || withFullScreenPortal) {
      return (
        <Portal isOpened>
          {this.renderDayPicker()}
        </Portal>
      );
    }

    return this.renderDayPicker();
  }

  renderDayPicker() {
    const {
      isDayBlocked,
      isDayHighlighted,
      isOutsideRange,
      numberOfMonths,
      orientation,
      monthFormat,
      renderMonth,
      navPrev,
      navNext,
      onPrevMonthClick,
      onNextMonthClick,
      onDatesChange,
      onFocusChange,
      withPortal,
      withFullScreenPortal,
      daySize,
      enableOutsideDays,
      focusedInput,
      startDate,
      endDate,
      minimumNights,
      keepOpenOnDateSelect,
      renderDay,
      renderCalendarInfo,
      firstDayOfWeek,
      initialVisibleMonth,
      hideKeyboardShortcutsPanel,
      customCloseIcon,
      onClose,
      phrases,
      isRTL,
      theme,
    } = this.props;
    const { dayPickerContainerStyles, isDayPickerFocused, showKeyboardShortcuts } = this.state;

    const onOutsideClick = (!withFullScreenPortal && withPortal)
      ? this.onOutsideClick
      : undefined;
    const initialVisibleMonthThunk =
      initialVisibleMonth || (() => (startDate || endDate || moment()));

    const closeIcon = customCloseIcon || (<CloseButton />);

    return (
      <div // eslint-disable-line jsx-a11y/no-static-element-interactions
        ref={(ref) => { this.dayPickerContainer = ref; }}
        className={this.getDayPickerContainerClasses()}
        style={dayPickerContainerStyles}
        onClick={onOutsideClick}
      >
        <DayPickerRangeController
          ref={(ref) => { this.dayPicker = ref; }}
          orientation={orientation}
          enableOutsideDays={enableOutsideDays}
          numberOfMonths={numberOfMonths}
          onPrevMonthClick={onPrevMonthClick}
          onNextMonthClick={onNextMonthClick}
          onDatesChange={onDatesChange}
          onFocusChange={onFocusChange}
          onClose={onClose}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
          monthFormat={monthFormat}
          renderMonth={renderMonth}
          withPortal={withPortal || withFullScreenPortal}
          daySize={daySize}
          initialVisibleMonth={initialVisibleMonthThunk}
          hideKeyboardShortcutsPanel={hideKeyboardShortcutsPanel}
          navPrev={navPrev}
          navNext={navNext}
          minimumNights={minimumNights}
          isOutsideRange={isOutsideRange}
          isDayHighlighted={isDayHighlighted}
          isDayBlocked={isDayBlocked}
          keepOpenOnDateSelect={keepOpenOnDateSelect}
          renderDay={renderDay}
          renderCalendarInfo={renderCalendarInfo}
          isFocused={isDayPickerFocused}
          showKeyboardShortcuts={showKeyboardShortcuts}
          onBlur={this.onDayPickerBlur}
          phrases={phrases}
          isRTL={isRTL}
          firstDayOfWeek={firstDayOfWeek}
        />

        {withFullScreenPortal && (
          <button
            className={theme["DateRangePicker__close"]}
            type="button"
            onClick={this.onOutsideClick}
            aria-label={phrases.closeDatePicker}
          >
            <div className={theme["DateRangePicker__close"]}>
              {closeIcon}
            </div>
          </button>
        )}
      </div>
    );
  }

  render() {
    const {
      startDate,
      startDateId,
      startDatePlaceholderText,
      endDate,
      endDateId,
      endDatePlaceholderText,
      focusedInput,
      screenReaderInputMessage,
      showClearDates,
      showDefaultInputIcon,
      customInputIcon,
      customArrowIcon,
      customCloseIcon,
      disabled,
      required,
      readOnly,
      phrases,
      isOutsideRange,
      minimumNights,
      withPortal,
      withFullScreenPortal,
      displayFormat,
      reopenPickerOnClearDates,
      keepOpenOnDateSelect,
      onDatesChange,
      onClose,
      isRTL,
      theme,
    } = this.props;

    const { isDateRangePickerInputFocused } = this.state;

    const onOutsideClick = (!withPortal && !withFullScreenPortal) ? this.onOutsideClick : undefined;

    return (
      <div className={theme["DateRangePicker"]}>
        <OutsideClickHandler onOutsideClick={onOutsideClick}>
          <DateRangePickerInputController
            startDate={startDate}
            startDateId={startDateId}
            startDatePlaceholderText={startDatePlaceholderText}
            isStartDateFocused={focusedInput === START_DATE}
            endDate={endDate}
            endDateId={endDateId}
            endDatePlaceholderText={endDatePlaceholderText}
            isEndDateFocused={focusedInput === END_DATE}
            displayFormat={displayFormat}
            showClearDates={showClearDates}
            showCaret={!withPortal && !withFullScreenPortal}
            showDefaultInputIcon={showDefaultInputIcon}
            customInputIcon={customInputIcon}
            customArrowIcon={customArrowIcon}
            customCloseIcon={customCloseIcon}
            disabled={disabled}
            required={required}
            readOnly={readOnly}
            reopenPickerOnClearDates={reopenPickerOnClearDates}
            keepOpenOnDateSelect={keepOpenOnDateSelect}
            isOutsideRange={isOutsideRange}
            minimumNights={minimumNights}
            withFullScreenPortal={withFullScreenPortal}
            onDatesChange={onDatesChange}
            onFocusChange={this.onDateRangePickerInputFocus}
            onArrowDown={this.onDayPickerFocus}
            onQuestionMark={this.showKeyboardShortcutsPanel}
            onClose={onClose}
            phrases={phrases}
            screenReaderMessage={screenReaderInputMessage}
            isFocused={isDateRangePickerInputFocused}
            isRTL={isRTL}
          />

          {this.maybeRenderDayPickerWithPortal()}
        </OutsideClickHandler>
      </div>
    );
  }
}

export default themr(DATEPICKER, baseTheme)(DateRangePicker);

DateRangePicker.propTypes = propTypes;
DateRangePicker.defaultProps = defaultProps;

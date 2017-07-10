import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import shallowCompare from 'react-addons-shallow-compare';
import * as moment from 'moment';
import * as cx from 'classnames';
import * as Portal from 'react-portal';
// import { forbidExtraProps } from 'airbnb-prop-types';
import { addEventListener, removeEventListener } from 'consolidated-events';
// import isTouchDevice from 'is-touch-device';

import DateRangePickerPhrases from './defaultPhrases';

import OutsideClickHandler from './OutsideClickHandler';
import getResponsiveContainerStyles from '../utils/getResponsiveContainerStyles';

import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';

import DateRangePickerInputController from './DateRangePickerInputController';
import DayPickerRangeController from './DayPickerRangeController';

import CloseButton from '../svg/close.svg';

// import DateRangePickerShape from '../shapes/DateRangePickerShape';
import Constants from './constants';

// const propTypes = forbidExtraProps(DateRangePickerShape);



export interface State { 
  dayPickerContainerStyles: any,
  isDayPickerFocused: any, 
  showKeyboardShortcuts: any,
  isDateRangePickerInputFocused: any,
}
export interface Props {
  focusedInput?: any,
  onFocusChange?: any,
  onClose?: any,
  startDate?: any,
  endDate?: any,
  withPortal?: any,
  withFullScreenPortal?: any,
  orientation?: any,
  anchorDirection?: any,
  isRTL?: any,
  dayPicker?: any,
  horizontalMargin?: any,
  dayPickerContainerStyles?: any,
  startDateId?: number,
  startDatePlaceholderText?: string,
  endDateId?: number,
  endDatePlaceholderText?: string,
  screenReaderInputMessage?: string,
  showClearDates?: any,
  showDefaultInputIcon?: any,
  customInputIcon?: any,
  customArrowIcon?: any,
  customCloseIcon?: any,
  disabled?: any,
  required?: any,
  readOnly?: any,
  phrases?: any,
  isOutsideRange?: any,
  displayFormat?: any,
  reopenPickerOnClearDates?: any,
  keepOpenOnDateSelect?: any,
  onDatesChange?: any,
  isDayBlocked?: any,
  isDayHighlighted?: any,
  numberOfMonths?: any,
  monthFormat?: any,
  renderMonth?: any,
  navPrev?: any,
  navNext?: any,
  onPrevMonthClick?: any,
  onNextMonthClick?: any,
  daySize?: any,
  enableOutsideDays?: any,
  minimumNights?: any,
  renderDay?: any,
  renderCalendarInfo?: any,
  initialVisibleMonth?: Function,
  hideKeyboardShortcutsPanel?: any,
}

export default class DateRangePicker extends React.Component<Props, State> {
  
  dayPickerContainer: any;
  dayPicker: any;
  resizeHandle: any;
  isTouchDevice: boolean;


  static defaultProps = {
    // required props for a functional interactive DateRangePicker
    startDate: null,
    endDate: null,
    focusedInput: null,

    // input related props
    startDateId: Constants.START_DATE,
    startDatePlaceholderText: 'Start Date',
    endDateId: Constants.END_DATE,
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
    orientation: Constants.HORIZONTAL_ORIENTATION,
    anchorDirection: Constants.ANCHOR_LEFT,
    horizontalMargin: 0,
    withPortal: false,
    withFullScreenPortal: false,
    initialVisibleMonth: null,
    numberOfMonths: 2,
    keepOpenOnDateSelect: false,
    reopenPickerOnClearDates: false,
    renderCalendarInfo: null,
    hideKeyboardShortcutsPanel: false,
    daySize: Constants.DAY_SIZE,
    isRTL: false,

    // navigation related props
    navPrev: null,
    navNext: null,

    onPrevMonthClick() { },
    onNextMonthClick() { },

    onClose() { },

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


  constructor(props: any) {
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

    this.isTouchDevice = false;  //isTouchDevice()
  }

  // shouldComponentUpdate(nextProps: any, nextState: any) {
  //   return shallowCompare(this, nextProps, nextState);
  // }

  componentDidUpdate(prevProps: any) {
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

  onDateRangePickerInputFocus(focusedInput: any) {
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
    if (!focusedInput) onFocusChange(Constants.START_DATE);

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
    } = this.props;

    const dayPickerClassName = cx('DateRangePicker__picker', {
      'DateRangePicker__picker--direction-left': anchorDirection === Constants.ANCHOR_LEFT,
      'DateRangePicker__picker--direction-right': anchorDirection === Constants.ANCHOR_RIGHT,
      'DateRangePicker__picker--horizontal': orientation === Constants.HORIZONTAL_ORIENTATION,
      'DateRangePicker__picker--vertical': orientation === Constants.VERTICAL_ORIENTATION,
      'DateRangePicker__picker--portal': withPortal || withFullScreenPortal,
      'DateRangePicker__picker--full-screen-portal': withFullScreenPortal,
      'DateRangePicker__picker--rtl': isRTL,
    });

    return dayPickerClassName;
  }

  getDayPickerDOMNode() {
    return ReactDOM.findDOMNode(this.dayPicker); // eslint-disable-line react/no-find-dom-node
  }

  isOpened() {
    const { focusedInput }: any = this.props;
    return focusedInput === Constants.START_DATE || focusedInput === Constants.END_DATE;
  }

  responsivizePickerPosition() {
    if (!this.isOpened()) {
      return;
    }

    const { anchorDirection, horizontalMargin, withPortal, withFullScreenPortal }: any = this.props;
    const { dayPickerContainerStyles }: any = this.state;

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

  showKeyboardShortcutsPanel() {
    this.setState({
      isDateRangePickerInputFocused: false,
      isDayPickerFocused: true,
      showKeyboardShortcuts: true,
    });
  }

  maybeRenderDayPickerWithPortal() {
    const { withPortal, withFullScreenPortal }: any = this.props;

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
      initialVisibleMonth,
      hideKeyboardShortcutsPanel,
      customCloseIcon,
      onClose,
      phrases,
      isRTL,
    } = this.props;
    const { dayPickerContainerStyles, isDayPickerFocused, showKeyboardShortcuts }: any = this.state;

    const onOutsideClick: any = (!withFullScreenPortal && withPortal)
      ? this.onOutsideClick
      : undefined;
    const initialVisibleMonthThunk: Function =
      initialVisibleMonth || (() => (startDate || endDate || moment()));

    const closeIcon: any = customCloseIcon || (<CloseButton />);

    return (
      <div // eslint-disable-line jsx-a11y/no-static-element-interactions
        ref={(ref) => { this.dayPickerContainer = ref; }}
        className={this.getDayPickerContainerClasses()}
        style={dayPickerContainerStyles}
        onClick={onOutsideClick}
      >
        <DayPickerRangeController
          ref={(ref: any) => { this.dayPicker = ref; }}
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
        />

        {withFullScreenPortal && (
          <button
            className="DateRangePicker__close"
            type="button"
            onClick={this.onOutsideClick}
            aria-label={phrases.closeDatePicker}
          >
            <div className="DateRangePicker__close">
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
      withPortal,
      withFullScreenPortal,
      displayFormat,
      reopenPickerOnClearDates,
      keepOpenOnDateSelect,
      onDatesChange,
      onClose,
      isRTL,
    } = this.props;

    const { isDateRangePickerInputFocused } = this.state;

    const onOutsideClick: any = (!withPortal && !withFullScreenPortal) ? this.onOutsideClick : undefined;

    return (
      <div className="DateRangePicker">
        <OutsideClickHandler onOutsideClick={onOutsideClick}>
          <DateRangePickerInputController
            startDate={startDate}
            startDateId={startDateId}
            startDatePlaceholderText={startDatePlaceholderText}
            isStartDateFocused={focusedInput === Constants.START_DATE}
            endDate={endDate}
            endDateId={endDateId}
            endDatePlaceholderText={endDatePlaceholderText}
            isEndDateFocused={focusedInput === Constants.END_DATE}
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

// DateRangePicker.propTypes = propTypes;
// DateRangePicker.defaultProps = defaultProps;

import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import moment from 'moment';
import values from 'object.values';
import isTouchDevice from 'is-touch-device';

import { DayPickerPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import isSameDay from '../utils/isSameDay';
import isAfterDay from '../utils/isAfterDay';

import getVisibleDays from '../utils/getVisibleDays';
import isDayVisible from '../utils/isDayVisible';

import toISODateString from '../utils/toISODateString';
import toISOMonthString from '../utils/toISOMonthString';

import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
  DAY_SIZE,
} from '../Constants';

import DayPicker from './DayPicker';

const propTypes = forbidExtraProps({
  date: momentPropTypes.momentObj,
  onDateChange: PropTypes.func,

  focused: PropTypes.bool,
  onFocusChange: PropTypes.func,
  onClose: PropTypes.func,

  keepOpenOnDateSelect: PropTypes.bool,
  minimumNights: PropTypes.number,
  isOutsideRange: PropTypes.func,
  isDayBlocked: PropTypes.func,
  isDayHighlighted: PropTypes.func,

  // DayPicker props
  renderMonth: PropTypes.func,
  enableOutsideDays: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  orientation: ScrollableOrientationShape,
  withPortal: PropTypes.bool,
  initialVisibleMonth: PropTypes.func,
  firstDayOfWeek: DayOfWeekShape,
  hideKeyboardShortcutsPanel: PropTypes.bool,
  daySize: nonNegativeInteger,

  navPrev: PropTypes.node,
  navNext: PropTypes.node,

  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,
  onOutsideClick: PropTypes.func,
  renderDay: PropTypes.func,
  renderCalendarInfo: PropTypes.func,

  // accessibility
  onBlur: PropTypes.func,
  isFocused: PropTypes.bool,
  showKeyboardShortcuts: PropTypes.bool,

  // i18n
  monthFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(DayPickerPhrases)),

  isRTL: PropTypes.bool,

  theme: PropTypes.any,
});

const defaultProps = {
  date: undefined, // TODO: use null
  onDateChange() {},

  focused: false,
  onFocusChange() {},
  onClose() {},

  keepOpenOnDateSelect: false,
  minimumNights: 1,
  isOutsideRange() {},
  isDayBlocked() {},
  isDayHighlighted() {},

  // DayPicker props
  renderMonth: null,
  enableOutsideDays: false,
  numberOfMonths: 1,
  orientation: HORIZONTAL_ORIENTATION,
  withPortal: false,
  hideKeyboardShortcutsPanel: false,
  initialVisibleMonth: null,
  firstDayOfWeek: null,
  daySize: DAY_SIZE,

  navPrev: null,
  navNext: null,

  onPrevMonthClick() {},
  onNextMonthClick() {},
  onOutsideClick() {},

  renderDay: null,
  renderCalendarInfo: null,

  // accessibility
  onBlur() {},
  isFocused: false,
  showKeyboardShortcuts: false,

  // i18n
  monthFormat: 'MMMM YYYY',
  phrases: DayPickerPhrases,

  isRTL: false,
};

export default class DayPickerSingleDateController extends React.Component {
  constructor(props) {
    super(props);

    this.isTouchDevice = false;
    this.today = moment();

    this.modifiers = {
      today: day => this.isToday(day),
      blocked: day => this.isBlocked(day),
      'blocked-calendar': day => props.isDayBlocked(day),
      'blocked-out-of-range': day => props.isOutsideRange(day),
      'highlighted-calendar': day => props.isDayHighlighted(day),
      valid: day => !this.isBlocked(day),
      hovered: day => this.isHovered(day),
      selected: day => this.isSelected(day),
    };

    const { currentMonth, visibleDays } = this.getStateForNewMonth(props);

    this.state = {
      hoverDate: null,
      currentMonth,
      visibleDays,
    };

    this.onDayMouseEnter = this.onDayMouseEnter.bind(this);
    this.onDayMouseLeave = this.onDayMouseLeave.bind(this);
    this.onDayClick = this.onDayClick.bind(this);

    this.onPrevMonthClick = this.onPrevMonthClick.bind(this);
    this.onNextMonthClick = this.onNextMonthClick.bind(this);

    this.getFirstFocusableDay = this.getFirstFocusableDay.bind(this);
  }

  componentDidMount() {
    this.isTouchDevice = isTouchDevice();
  }

  componentWillReceiveProps(nextProps) {
    const {
      date,
      focused,
      isOutsideRange,
      isDayBlocked,
      isDayHighlighted,
      initialVisibleMonth,
      numberOfMonths,
      enableOutsideDays,
    } = nextProps;
    let { visibleDays } = this.state;

    if (isOutsideRange !== this.props.isOutsideRange) {
      this.modifiers['blocked-out-of-range'] = day => isOutsideRange(day);
    }

    if (isDayBlocked !== this.props.isDayBlocked) {
      this.modifiers['blocked-calendar'] = day => isDayBlocked(day);
    }

    if (isDayHighlighted !== this.props.isDayHighlighted) {
      this.modifiers['highlighted-calendar'] = day => isDayHighlighted(day);
    }

    if (
      initialVisibleMonth !== this.props.initialVisibleMonth ||
      numberOfMonths !== this.props.numberOfMonths ||
      enableOutsideDays !== this.props.enableOutsideDays
    ) {
      const newMonthState = this.getStateForNewMonth(nextProps);
      const currentMonth = newMonthState.currentMonth;
      visibleDays = newMonthState.visibleDays;
      this.setState({
        currentMonth,
        visibleDays,
      });
    }

    const didDateChange = date !== this.props.date;
    const didFocusChange = focused !== this.props.focused;

    let modifiers = {};

    if (didDateChange) {
      modifiers = this.deleteModifier(modifiers, this.props.date, 'selected');
      modifiers = this.addModifier(modifiers, date, 'selected');
    }

    if (didFocusChange) {
      values(visibleDays).forEach((days) => {
        Object.keys(days).forEach((day) => {
          const momentObj = moment(day);
          if (this.isBlocked(momentObj)) {
            modifiers = this.addModifier(modifiers, momentObj, 'blocked');
          } else {
            modifiers = this.deleteModifier(modifiers, momentObj, 'blocked');
          }

          if (isOutsideRange(momentObj)) {
            modifiers = this.addModifier(modifiers, momentObj, 'blocked-out-of-range');
          } else {
            modifiers = this.deleteModifier(modifiers, momentObj, 'blocked-out-of-range');
          }

          if (isDayBlocked(momentObj)) {
            modifiers = this.addModifier(modifiers, momentObj, 'blocked-calendar');
          } else {
            modifiers = this.deleteModifier(modifiers, momentObj, 'blocked-calendar');
          }

          if (isDayHighlighted(momentObj)) {
            modifiers = this.addModifier(modifiers, momentObj, 'highlighted-calendar');
          } else {
            modifiers = this.deleteModifier(modifiers, momentObj, 'highlighted-calendar');
          }
        });
      });
    }

    const today = moment();
    if (!isSameDay(this.today, today)) {
      modifiers = this.deleteModifier(modifiers, this.today, 'today');
      modifiers = this.addModifier(modifiers, today, 'today');
      this.today = today;
    }

    if (Object.keys(modifiers).length > 0) {
      this.setState({
        visibleDays: {
          ...visibleDays,
          ...modifiers,
        },
      });
    }
  }

  componentWillUpdate() {
    this.today = moment();
  }

  onDayClick(day, e) {
    if (e) e.preventDefault();
    if (this.isBlocked(day)) return;
    const {
      onDateChange,
      keepOpenOnDateSelect,
      onFocusChange,
      onClose,
    } = this.props;

    onDateChange(day);
    if (!keepOpenOnDateSelect) {
      onFocusChange({ focused: null });
      onClose({ date: day });
    }
  }

  onDayMouseEnter(day) {
    if (this.isTouchDevice) return;
    const { hoverDate, visibleDays } = this.state;

    let modifiers = this.deleteModifier({}, hoverDate, 'hovered');
    modifiers = this.addModifier(modifiers, day, 'hovered');

    this.setState({
      hoverDate: day,
      visibleDays: {
        ...visibleDays,
        ...modifiers,
      },
    });
  }

  onDayMouseLeave() {
    const { hoverDate, visibleDays } = this.state;
    if (this.isTouchDevice || !hoverDate) return;

    const modifiers = this.deleteModifier({}, hoverDate, 'hovered');

    this.setState({
      hoverDate: null,
      visibleDays: {
        ...visibleDays,
        ...modifiers,
      },
    });
  }

  onPrevMonthClick() {
    const { onPrevMonthClick, numberOfMonths, enableOutsideDays } = this.props;
    const { currentMonth, visibleDays } = this.state;

    const newVisibleDays = {};
    Object.keys(visibleDays).sort().slice(0, numberOfMonths + 1).forEach((month) => {
      newVisibleDays[month] = visibleDays[month];
    });

    const prevMonth = currentMonth.clone().subtract(1, 'month');
    const prevMonthVisibleDays = getVisibleDays(prevMonth, 1, enableOutsideDays);

    this.setState({
      currentMonth: prevMonth,
      visibleDays: {
        ...newVisibleDays,
        ...this.getModifiers(prevMonthVisibleDays),
      },
    });

    onPrevMonthClick();
  }

  onNextMonthClick() {
    const { onNextMonthClick, numberOfMonths, enableOutsideDays } = this.props;
    const { currentMonth, visibleDays } = this.state;

    const newVisibleDays = {};
    Object.keys(visibleDays).sort().slice(1).forEach((month) => {
      newVisibleDays[month] = visibleDays[month];
    });

    const nextMonth = currentMonth.clone().add(numberOfMonths, 'month');
    const nextMonthVisibleDays = getVisibleDays(nextMonth, 1, enableOutsideDays);

    this.setState({
      currentMonth: currentMonth.clone().add(1, 'month'),
      visibleDays: {
        ...newVisibleDays,
        ...this.getModifiers(nextMonthVisibleDays),
      },
    });

    onNextMonthClick();
  }


  getFirstFocusableDay(newMonth) {
    const { date, numberOfMonths } = this.props;

    let focusedDate = newMonth.clone().startOf('month');
    if (date) {
      focusedDate = date.clone();
    }

    if (this.isBlocked(focusedDate)) {
      const days = [];
      const lastVisibleDay = newMonth.clone().add(numberOfMonths - 1, 'months').endOf('month');
      let currentDay = focusedDate.clone();
      while (!isAfterDay(currentDay, lastVisibleDay)) {
        currentDay = currentDay.clone().add(1, 'day');
        days.push(currentDay);
      }

      const viableDays = days.filter(day => !this.isBlocked(day) && isAfterDay(day, focusedDate));
      if (viableDays.length > 0) focusedDate = viableDays[0];
    }

    return focusedDate;
  }

  getModifiers(visibleDays) {
    const modifiers = {};
    Object.keys(visibleDays).forEach((month) => {
      modifiers[month] = {};
      visibleDays[month].forEach((day) => {
        modifiers[month][toISODateString(day)] = this.getModifiersForDay(day);
      });
    });

    return modifiers;
  }

  getModifiersForDay(day) {
    return new Set(Object.keys(this.modifiers).filter(modifier => this.modifiers[modifier](day)));
  }

  getStateForNewMonth(nextProps) {
    const { initialVisibleMonth, date, numberOfMonths, enableOutsideDays } = nextProps;
    const initialVisibleMonthThunk = initialVisibleMonth || (date ? () => date : () => this.today);
    const currentMonth = initialVisibleMonthThunk();
    const visibleDays =
      this.getModifiers(getVisibleDays(currentMonth, numberOfMonths, enableOutsideDays));
    return { currentMonth, visibleDays };
  }

  addModifier(updatedDays, day, modifier) {
    const { numberOfMonths: numberOfVisibleMonths, enableOutsideDays, orientation } = this.props;
    const { currentMonth: firstVisibleMonth, visibleDays } = this.state;

    let currentMonth = firstVisibleMonth;
    let numberOfMonths = numberOfVisibleMonths;
    if (orientation !== VERTICAL_SCROLLABLE) {
      currentMonth = currentMonth.clone().subtract(1, 'month');
      numberOfMonths += 2;
    }
    if (!day || !isDayVisible(day, currentMonth, numberOfMonths, enableOutsideDays)) {
      return updatedDays;
    }

    const iso = toISODateString(day);

    let updatedDaysAfterAddition = { ...updatedDays };
    if (enableOutsideDays) {
      const monthsToUpdate = Object.keys(visibleDays).filter(monthKey => (
        Object.keys(visibleDays[monthKey]).indexOf(iso) > -1
      ));

      updatedDaysAfterAddition = monthsToUpdate.reduce((days, monthIso) => {
        const month = updatedDays[monthIso] || visibleDays[monthIso];
        const modifiers = new Set(month[iso]);
        modifiers.add(modifier);
        return {
          ...days,
          [monthIso]: {
            ...month,
            [iso]: modifiers,
          },
        };
      }, updatedDaysAfterAddition);
    } else {
      const monthIso = toISOMonthString(day);
      const month = updatedDays[monthIso] || visibleDays[monthIso];

      const modifiers = new Set(month[iso]);
      modifiers.add(modifier);
      updatedDaysAfterAddition = {
        ...updatedDaysAfterAddition,
        [monthIso]: {
          ...month,
          [iso]: modifiers,
        },
      };
    }

    return updatedDaysAfterAddition;
  }

  deleteModifier(updatedDays, day, modifier) {
    const { numberOfMonths: numberOfVisibleMonths, enableOutsideDays, orientation } = this.props;
    const { currentMonth: firstVisibleMonth, visibleDays } = this.state;

    let currentMonth = firstVisibleMonth;
    let numberOfMonths = numberOfVisibleMonths;
    if (orientation !== VERTICAL_SCROLLABLE) {
      currentMonth = currentMonth.clone().subtract(1, 'month');
      numberOfMonths += 2;
    }
    if (!day || !isDayVisible(day, currentMonth, numberOfMonths, enableOutsideDays)) {
      return updatedDays;
    }

    const iso = toISODateString(day);

    let updatedDaysAfterDeletion = { ...updatedDays };
    if (enableOutsideDays) {
      const monthsToUpdate = Object.keys(visibleDays).filter(monthKey => (
        Object.keys(visibleDays[monthKey]).indexOf(iso) > -1
      ));

      updatedDaysAfterDeletion = monthsToUpdate.reduce((days, monthIso) => {
        const month = updatedDays[monthIso] || visibleDays[monthIso];
        const modifiers = new Set(month[iso]);
        modifiers.delete(modifier);
        return {
          ...days,
          [monthIso]: {
            ...month,
            [iso]: modifiers,
          },
        };
      }, updatedDaysAfterDeletion);
    } else {
      const monthIso = toISOMonthString(day);
      const month = updatedDays[monthIso] || visibleDays[monthIso];

      const modifiers = new Set(month[iso]);
      modifiers.delete(modifier);
      updatedDaysAfterDeletion = {
        ...updatedDaysAfterDeletion,
        [monthIso]: {
          ...month,
          [iso]: modifiers,
        },
      };
    }

    return updatedDaysAfterDeletion;
  }

  isBlocked(day) {
    const { isDayBlocked, isOutsideRange } = this.props;
    return isDayBlocked(day) || isOutsideRange(day);
  }

  isHovered(day) {
    const { hoverDate } = this.state || {};
    return isSameDay(day, hoverDate);
  }

  isSelected(day) {
    return isSameDay(day, this.props.date);
  }

  isToday(day) {
    return isSameDay(day, this.today);
  }

  render() {
    const {
      numberOfMonths,
      orientation,
      monthFormat,
      renderMonth,
      navPrev,
      navNext,
      withPortal,
      focused,
      enableOutsideDays,
      hideKeyboardShortcutsPanel,
      daySize,
      firstDayOfWeek,
      renderDay,
      renderCalendarInfo,
      isFocused,
      isRTL,
    } = this.props;

    const { phrases, currentMonth, visibleDays } = this.state;

    return (
      <DayPicker
        orientation={orientation}
        enableOutsideDays={enableOutsideDays}
        modifiers={visibleDays}
        numberOfMonths={numberOfMonths}
        onDayClick={this.onDayClick}
        onDayMouseEnter={this.onDayMouseEnter}
        onDayMouseLeave={this.onDayMouseLeave}
        onPrevMonthClick={this.onPrevMonthClick}
        onNextMonthClick={this.onNextMonthClick}
        monthFormat={monthFormat}
        withPortal={withPortal}
        hidden={!focused}
        hideKeyboardShortcutsPanel={hideKeyboardShortcutsPanel}
        initialVisibleMonth={() => currentMonth}
        firstDayOfWeek={firstDayOfWeek}
        navPrev={navPrev}
        navNext={navNext}
        renderMonth={renderMonth}
        renderDay={renderDay}
        renderCalendarInfo={renderCalendarInfo}
        isFocused={isFocused}
        getFirstFocusableDay={this.getFirstFocusableDay}
        onBlur={this.onDayPickerBlur}
        phrases={phrases}
        daySize={daySize}
        isRTL={isRTL}
      />
    );
  }
}

DayPickerSingleDateController.propTypes = propTypes;
DayPickerSingleDateController.defaultProps = defaultProps;

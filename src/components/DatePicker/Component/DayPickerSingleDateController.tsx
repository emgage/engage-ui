import * as React from 'react';
//import PropTypes from 'prop-types';
// import momentPropTypes from 'react-moment-proptypes';
// import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import * as moment from 'moment';
import values from 'object.values';
// import isTouchDevice from 'is-touch-device';

import  DayPickerPhrases  from './defaultPhrases';
//import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import isSameDay from '../utils/isSameDay';
import isAfterDay from '../utils/isAfterDay';

import getVisibleDays from '../utils/getVisibleDays';
import isDayVisible from '../utils/isDayVisible';

import toISODateString from '../utils/toISODateString';
import toISOMonthString from '../utils/toISOMonthString';

//import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import Constants from './constants';

import DayPicker from './DayPicker';


export interface State { }
export interface Props {
  numberOfMonths?: any,
  orientation?: any,
  monthFormat?: any,
  renderMonth?: any,
  navPrev?: any,
  navNext?: any,
  withPortal?: any,
  focused?: any,
  enableOutsideDays?: any,
  hideKeyboardShortcutsPanel?: any,
  daySize?: any,
  renderDay?: any,
  renderCalendarInfo?: any,
  isFocused?: any,
  isRTL?: any,
  isOutsideRange?: any,
  isDayBlocked?: any,
  isDayHighlighted?: any,
  initialVisibleMonth?: Function,
  date?: any,
  onDateChange?: any,
  keepOpenOnDateSelect?: any,
  onFocusChange?: any,
  onClose?: any,
  phrases?: any,
  onPrevMonthClick?: any,
  onNextMonthClick?: any,
  onOutsideClick?: any,
  onBlur?: any,
  showKeyboardShortcuts?: any,

}

export default class DayPickerSingleDateController extends React.Component<Props, State> {
  modifiers: {
    today: (day: any) => boolean;
    blocked: (day: any) => any;
    'blocked-calendar': (day: any) => any;
    'blocked-out-of-range': (day: any) => any;
    'highlighted-calendar': (day: any) => any;
    valid: (day: any) => boolean;
    hovered: (day: any) => boolean;
    selected: (day: any) => boolean;
  };

  onDayPickerBlur: any;
  // modifiers: {
  //   today: (day: any) => boolean;
  //   blocked: (day: any) => any;
  //   'blocked-calendar': (day: any) => any;
  //   'blocked-out-of-range': (day: any) => any;
  //   'highlighted-calendar': (day: any) => any;
  //   valid: (day: any) => boolean;
  //   hovered: (day: any) => boolean;
  //   selected: (day: any) => boolean;
  // };
  today: moment.Moment;
  isTouchDevice: boolean;
  constructor(props: any) {
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


  // static propTypes = ({
  //   date: PropTypes.object,
  //   onDateChange: PropTypes.func,

  //   focused: PropTypes.bool,
  //   onFocusChange: PropTypes.func,
  //   onClose: PropTypes.func,

  //   keepOpenOnDateSelect: PropTypes.bool,
  //   minimumNights: PropTypes.number,
  //   isOutsideRange: PropTypes.func,
  //   isDayBlocked: PropTypes.func,
  //   isDayHighlighted: PropTypes.func,

  //   // DayPicker props
  //   renderMonth: PropTypes.func,
  //   enableOutsideDays: PropTypes.bool,
  //   numberOfMonths: PropTypes.number,
  //   orientation: ScrollableOrientationShape,
  //   withPortal: PropTypes.bool,
  //   initialVisibleMonth: PropTypes.func,
  //   hideKeyboardShortcutsPanel: PropTypes.bool,
  //   daySize: PropTypes.number,

  //   navPrev: PropTypes.node,
  //   navNext: PropTypes.node,

  //   onPrevMonthClick: PropTypes.func,
  //   onNextMonthClick: PropTypes.func,
  //   onOutsideClick: PropTypes.func,
  //   renderDay: PropTypes.func,
  //   renderCalendarInfo: PropTypes.func,

  //   // accessibility
  //   onBlur: PropTypes.func,
  //   isFocused: PropTypes.bool,
  //   showKeyboardShortcuts: PropTypes.bool,

  //   // i18n
  //   monthFormat: PropTypes.string,
  //   phrases: PropTypes.shape(getPhrasePropTypes(DayPickerPhrases)),

  //   isRTL: PropTypes.bool,
  // });

  static defaultProps = {
    date: undefined, // TODO: use null
    onDateChange() { },

    focused: false,
    onFocusChange() { },
    onClose() { },

    keepOpenOnDateSelect: false,
    minimumNights: 1,
    isOutsideRange() { },
    isDayBlocked() { },
    isDayHighlighted() { },

    // DayPicker props
    renderMonth: null,
    enableOutsideDays: false,
    numberOfMonths: 1,
    orientation: Constants.HORIZONTAL_ORIENTATION,
    withPortal: false,
    hideKeyboardShortcutsPanel: false,
    initialVisibleMonth: null,
    daySize: Constants.DAY_SIZE,

    navPrev: null,
    navNext: null,

    onPrevMonthClick() { },
    onNextMonthClick() { },
    onOutsideClick() { },

    renderDay: null,
    renderCalendarInfo: null,

    // accessibility
    onBlur() { },
    isFocused: false,
    showKeyboardShortcuts: false,

    // i18n
    monthFormat: 'MMMM YYYY',
    phrases: DayPickerPhrases,

    isRTL: false,
  };
  componentDidMount() {
    this.isTouchDevice = false;  //isTouchDevice()
  }

  componentWillReceiveProps(nextProps: any) {
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
    let { visibleDays }: any = this.state;

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
      values(visibleDays).forEach((days: any) => {
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

  onDayClick(day: any, e: any) {
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

  onDayMouseEnter(day: any) {
    if (this.isTouchDevice) return;
    const { hoverDate, visibleDays }: any = this.state;

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
    const { hoverDate, visibleDays }: any = this.state;
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
    const { onPrevMonthClick, numberOfMonths, enableOutsideDays }: any = this.props;
    const { currentMonth, visibleDays }: any = this.state;

    const newVisibleDays: any = {};
    Object.keys(visibleDays).sort().slice(0, numberOfMonths + 1).forEach((month) => {
      newVisibleDays[month] = visibleDays[month];
    });

    const prevMonth = currentMonth.clone().subtract(1, 'month');
    const prevMonthVisibleDays = getVisibleDays(prevMonth, 1, enableOutsideDays, null);

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
    const { onNextMonthClick, numberOfMonths, enableOutsideDays }: any = this.props;
    const { currentMonth, visibleDays }: any = this.state;

    const newVisibleDays: any = {};
    Object.keys(visibleDays).sort().slice(1).forEach((month) => {
      newVisibleDays[month] = visibleDays[month];
    });

    const nextMonth = currentMonth.clone().add(numberOfMonths, 'month');
    const nextMonthVisibleDays = getVisibleDays(nextMonth, 1, enableOutsideDays, null);

    this.setState({
      currentMonth: currentMonth.clone().add(1, 'month'),
      visibleDays: {
        ...newVisibleDays,
        ...this.getModifiers(nextMonthVisibleDays),
      },
    });

    onNextMonthClick();
  }


  getFirstFocusableDay(newMonth: any) {
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

  getModifiers(visibleDays: any) {
    const modifiers: any = {};
    Object.keys(visibleDays).forEach((month) => {
      modifiers[month] = {};
      visibleDays[month].forEach((day: any) => {
        modifiers[month][toISODateString(day, null) as string] = this.getModifiersForDay(day);
      });
    });

    return modifiers;
  }

  getModifiersForDay(day: any) {
    return new Set(Object.keys(this.modifiers));  //.filter(modifier => this.modifiers[modifier](day))
  }

  getStateForNewMonth(nextProps: any) {
    const { initialVisibleMonth, date, numberOfMonths, enableOutsideDays }: any = nextProps;
    const initialVisibleMonthThunk = initialVisibleMonth || (date ? () => date : () => this.today);
    const currentMonth = initialVisibleMonthThunk();
    const visibleDays: any =
      this.getModifiers(getVisibleDays(currentMonth, numberOfMonths, enableOutsideDays, null));
    return { currentMonth, visibleDays };
  }

  addModifier(updatedDays: any, day: any, modifier: any) {
    const { numberOfMonths: numberOfVisibleMonths, enableOutsideDays, orientation } = this.props;
    const { currentMonth: firstVisibleMonth, visibleDays }: any = this.state;

    let currentMonth = firstVisibleMonth;
    let numberOfMonths = numberOfVisibleMonths;
    if (orientation !== Constants.VERTICAL_SCROLLABLE) {
      currentMonth = currentMonth.clone().subtract(1, 'month');
      numberOfMonths += 2;
    }
    if (!day || !isDayVisible(day, currentMonth, numberOfMonths, enableOutsideDays)) {
      return updatedDays;
    }

    const iso: any = toISODateString(day, null);

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
      const monthIso = toISOMonthString(day, null);
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

  deleteModifier(updatedDays: any, day: any, modifier: any) {
    const { numberOfMonths: numberOfVisibleMonths, enableOutsideDays, orientation }: any = this.props;
    const { currentMonth: firstVisibleMonth, visibleDays }: any = this.state;

    let currentMonth = firstVisibleMonth;
    let numberOfMonths = numberOfVisibleMonths;
    if (orientation !== Constants.VERTICAL_SCROLLABLE) {
      currentMonth = currentMonth.clone().subtract(1, 'month');
      numberOfMonths += 2;
    }
    if (!day || !isDayVisible(day, currentMonth, numberOfMonths, enableOutsideDays)) {
      return updatedDays;
    }

    const iso: any = toISODateString(day, null);

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
      const monthIso = toISOMonthString(day, null);
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

  isBlocked(day: any) {
    const { isDayBlocked, isOutsideRange } = this.props;
    return isDayBlocked(day) || isOutsideRange(day);
  }

  isHovered(day: any) {
    const { hoverDate }: any = this.state || {};
    return isSameDay(day, hoverDate);
  }

  isSelected(day: any) {
    return isSameDay(day, this.props.date);
  }

  isToday(day: any) {
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
      renderDay,
      renderCalendarInfo,
      isFocused,
      isRTL,
    } = this.props;

    const { phrases, currentMonth, visibleDays }: any = this.state;

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

// DayPickerSingleDateController.propTypes = propTypes;
// DayPickerSingleDateController.defaultProps = defaultProps;

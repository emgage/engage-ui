import * as React from 'react';
//import PropTypes from 'prop-types';
// import momentPropTypes from 'react-moment-proptypes';
// import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import * as moment from 'moment';
import values from 'object.values';
// import isTouchDevice from 'is-touch-device';

import  DayPickerPhrases  from './defaultPhrases';
//import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';
import isNextDay from '../utils/isNextDay';
import isSameDay from '../utils/isSameDay';
import isAfterDay from '../utils/isAfterDay';
import isBeforeDay from '../utils/isBeforeDay';

import getVisibleDays from '../utils/getVisibleDays';
import isDayVisible from '../utils/isDayVisible';

import toISODateString from '../utils/toISODateString';
import toISOMonthString from '../utils/toISOMonthString';

//import FocusedInputShape from '../shapes/FocusedInputShape';
//import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import Constants from './constants';

import DayPicker from './DayPicker';


export interface State {
  hoverDate: any, 
  visibleDays: any,
      currentMonth: any,
      phrases: any,
 }

export interface Props {
  numberOfMonths?: any,
  orientation?: any,
  monthFormat?: any,
  renderMonth?: any,
  navPrev?: any,
  navNext?: any,
  onOutsideClick?: any,
  withPortal?: any,
  enableOutsideDays?: any,
  initialVisibleMonth?: Function,
  hideKeyboardShortcutsPanel?: any,
  daySize?: any,
  focusedInput?: any,
  renderDay?: any,
  renderCalendarInfo?: any,
  onBlur?: any,
  isFocused?: any,
  showKeyboardShortcuts?: any,
  isRTL?: any,
  isOutsideRange?: any,
  isDayBlocked?: any,
  isDayHighlighted?: any,
  startDate?: any,
  endDate?:any,
  minimumNights?: any,
  phrases?: any,
  onFocusChange?: any, 
  onClose?: any,
  keepOpenOnDateSelect?: any,
  onDatesChange?: any,
  onPrevMonthClick?: any,
  onNextMonthClick?: any,

}

export default class DayPickerRangeController extends React.Component<Props, State> {
  modifiers: {
    today: (day: any) => boolean;
    blocked: (day: any) => any;
    'blocked-calendar': (day: any) => any;
    'blocked-out-of-range': (day: any) => any;
    'highlighted-calendar': (day: any) => any;
    valid: (day: any) => boolean;
    'selected-start': (day: any) => boolean;
    'selected-end': (day: any) => boolean;
    'blocked-minimum-nights': (day: any) => any;
    'selected-span': (day: any) => any;
    'last-in-range': (day: any) => boolean;
    hovered: (day: any) => boolean;
    'hovered-span': (day: any) => boolean;
    'after-hovered-start': (day: any) => boolean;
  };
  // [x: string]: {
  //   today: (day: any) => boolean;
  //   blocked: (
  //     // import momentPropTypes from 'react-moment-proptypes';
  //     // import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
  //     day: any) => ;
  //   'blocked-calendar': (day: any) => ;
  //   'blocked-out-of-range': (day: any) => ;
  //   'highlighted-calendar': (day: any) => ;
  //   valid: (day: any) => boolean;
  //   'selected-start': (// import isTouchDevice from 'is-touch-device';
  //     day: any) => boolean;
  //   'selected-end': (day: any) => boolean;
  //   'blocked-minimum-nights': (day: any) => ;
  //   'selected-span': (day: any) => ;
  //   'last-in-range': (day: any) => boolean;
  //   hovered: (day: any) => boolean;
  //   'hovered-span': (day: any) => boolean;
  //   'after-hovered-start': (day: any) => boolean;
  // };
  // [modifiers: any]: {
  //   today: (day: any) => boolean;
  //   blocked: (
  //     // import momentPropTypes from 'react-moment-proptypes';
  //     // import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
  //     day: any) => any;
  //   'blocked-calendar': (day: any) => any;
  //   'blocked-out-of-range': (day: any) => any;
  //   'highlighted-calendar': (day: any) => any;
  //   valid: (day: any) => boolean;
  //   'selected-start': (// import isTouchDevice from 'is-touch-device';
  //     day: any) => boolean;
  //   'selected-end': (day: any) => boolean;
  //   'blocked-minimum-nights': (day: any) => any;
  //   'selected-span': (day: any) => any;
  //   'last-in-range': (day: any) => boolean;
  //   hovered: (day: any) => boolean;
  //   'hovered-span': (day: any) => boolean;
  //   'after-hovered-start': (day: any) => boolean;
  // };

  // modifiers: any {
  //   today: (day: any) => any;
  //   blocked: (day: any) => any;
  //   'blocked-calendar': (day: any) => any;
  //   'blocked-out-of-range': (day: any) => any;
  //   'highlighted-calendar': (day: any) => any;
  //   valid: (day: any) => boolean;
  //   'selected-start': (day: any) => boolean;
  //   'selected-end': (day: any) => boolean;
  //   'blocked-minimum-nights': (day: any) => any;
  //   'selected-span': (day: any) => any;
  //   'last-in-range': (day: any) => boolean;
  //   hovered: (day: any) => boolean;
  //   'hovered-span': (day: any) => boolean;
  //   'after-hovered-start': (day: any) => boolean;
  // };
  dayPicker: DayPicker | null;
  today: moment.Moment;
  isTouchDevice: boolean;
  constructor(props: any) {
    super(props);

    this.isTouchDevice = false;   //isTouchDevice()
    this.today = moment();
    this.modifiers = {
      today: day => this.isToday(day),
      blocked: day => this.isBlocked(day),
      'blocked-calendar': day => props.isDayBlocked(day),
      'blocked-out-of-range': day => props.isOutsideRange(day),
      'highlighted-calendar': day => props.isDayHighlighted(day),
      valid: day => !this.isBlocked(day),
      'selected-start': day => this.isStartDate(day),
      'selected-end': day => this.isEndDate(day),
      'blocked-minimum-nights': day => this.doesNotMeetMinimumNights(day),
      'selected-span': day => this.isInSelectedSpan(day),
      'last-in-range': day => this.isLastInRange(day),
      hovered: day => this.isHovered(day),
      'hovered-span': day => this.isInHoveredSpan(day),
      'after-hovered-start': day => this.isDayAfterHoveredStartDate(day),
    };

    const { currentMonth, visibleDays } = this.getStateForNewMonth(props);

    this.state = {
      hoverDate: null,
      currentMonth,
      phrases: props.phrases,
      visibleDays,
    };

    this.onDayClick = this.onDayClick.bind(this);
    this.onDayMouseEnter = this.onDayMouseEnter.bind(this);
    this.onDayMouseLeave = this.onDayMouseLeave.bind(this);
    this.onPrevMonthClick = this.onPrevMonthClick.bind(this);
    this.onNextMonthClick = this.onNextMonthClick.bind(this);
    this.onMultiplyScrollableMonths = this.onMultiplyScrollableMonths.bind(this);
    this.getFirstFocusableDay = this.getFirstFocusableDay.bind(this);
  }

  // static propTypes = ({
  //   startDate: PropTypes.object,
  //   endDate: PropTypes.object,
  //   onDatesChange: PropTypes.func,

  //   focusedInput: FocusedInputShape,
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
    startDate: undefined, // TODO: use null
    endDate: undefined, // TODO: use null
    onDatesChange() { },

    focusedInput: null,
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

  componentWillReceiveProps(nextProps: any) {
    const {
      startDate,
      endDate,
      focusedInput,
      minimumNights,
      isOutsideRange,
      isDayBlocked,
      isDayHighlighted,
      phrases,
      initialVisibleMonth,
      numberOfMonths,
      enableOutsideDays,
    } = nextProps;
    let { visibleDays }: any = this.state;

    if (isOutsideRange !== this.props.isOutsideRange) {
      this.modifiers['blocked-out-of-range'] = (day: any) => isOutsideRange(day);
    }

    if (isDayBlocked !== this.props.isDayBlocked) {
      this.modifiers['blocked-calendar'] = (day: any) => isDayBlocked(day);
    }

    if (isDayHighlighted !== this.props.isDayHighlighted) {
      this.modifiers['highlighted-calendar'] = (day: any) => isDayHighlighted(day);
    }

    const didStartDateChange = startDate !== this.props.startDate;
    const didEndDateChange = endDate !== this.props.endDate;
    const didFocusChange = focusedInput !== this.props.focusedInput;

    if (
      (
        initialVisibleMonth !== this.props.initialVisibleMonth ||
        numberOfMonths !== this.props.numberOfMonths ||
        enableOutsideDays !== this.props.enableOutsideDays
      ) && (
        !this.props.focusedInput &&
        didFocusChange
      )
    ) {
      const newMonthState = this.getStateForNewMonth(nextProps);
      const currentMonth = newMonthState.currentMonth;
      visibleDays = newMonthState.visibleDays;
      this.setState({
        currentMonth,
        visibleDays,
      });
    }

    let modifiers = {};

    if (didStartDateChange) {
      modifiers = this.deleteModifier(modifiers, this.props.startDate, 'selected-start');
      modifiers = this.addModifier(modifiers, startDate, 'selected-start');
    }

    if (didEndDateChange) {
      modifiers = this.deleteModifier(modifiers, this.props.endDate, 'selected-end');
      modifiers = this.addModifier(modifiers, endDate, 'selected-end');
    }

    if (didStartDateChange || didEndDateChange) {
      if (this.props.startDate && this.props.endDate) {
        modifiers = this.deleteModifierFromRange(
          modifiers,
          this.props.startDate,
          this.props.endDate.clone().add(1, 'day'),
          'selected-span',
        );
      }

      if (startDate && endDate) {
        modifiers = this.deleteModifierFromRange(
          modifiers,
          startDate,
          endDate.clone().add(1, 'day'),
          'hovered-span',
        );

        modifiers = this.addModifierToRange(
          modifiers,
          startDate.clone().add(1, 'day'),
          endDate,
          'selected-span',
        );
      }
    }

    if (!this.isTouchDevice && didStartDateChange && startDate && !endDate) {
      const startSpan = startDate.clone().add(1, 'day');
      const endSpan = startDate.clone().add(minimumNights + 1, 'days');
      modifiers = this.addModifierToRange(modifiers, startSpan, endSpan, 'after-hovered-start');
    }

    if (minimumNights > 0 || minimumNights !== this.props.minimumNights) {
      if (didFocusChange || didStartDateChange) {
        const startSpan = this.props.startDate ? this.props.startDate : this.today;
        modifiers = this.deleteModifierFromRange(
          modifiers,
          startSpan,
          startSpan.clone().add(minimumNights, 'days'),
          'blocked-minimum-nights',
        );
      }

      if (startDate && focusedInput === Constants.END_DATE) {
        modifiers = this.addModifierToRange(
          modifiers,
          startDate,
          startDate.clone().add(minimumNights, 'days'),
          'blocked-minimum-nights',
        );
      }
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

    if (didFocusChange || phrases !== this.props.phrases) {
      // set the appropriate CalendarDay phrase based on focusedInput
      let chooseAvailableDate = phrases.chooseAvailableDate;
      if (focusedInput === Constants.START_DATE) {
        chooseAvailableDate = phrases.chooseAvailableStartDate;
      } else if (focusedInput === Constants.END_DATE) {
        chooseAvailableDate = phrases.chooseAvailableEndDate;
      }

      this.setState({
        phrases: {
          ...phrases,
          chooseAvailableDate,
        },
      });
    }
  }

  onDayClick(day: any, e: any) {
    const { keepOpenOnDateSelect, minimumNights, onBlur } = this.props;
    if (e) e.preventDefault();
    if (this.isBlocked(day)) return;

    const { focusedInput, onFocusChange, onClose } = this.props;
    let { startDate, endDate } = this.props;

    if (focusedInput === Constants.START_DATE) {
      onFocusChange(Constants.END_DATE);

      startDate = day;

      if (isInclusivelyAfterDay(day, endDate)) {
        endDate = null;
      }
    } else if (focusedInput === Constants.END_DATE) {
      const firstAllowedEndDate = startDate && startDate.clone().add(minimumNights, 'days');

      if (!startDate) {
        endDate = day;
        onFocusChange(Constants.START_DATE);
      } else if (isInclusivelyAfterDay(day, firstAllowedEndDate)) {
        endDate = day;
        if (!keepOpenOnDateSelect) {
          onFocusChange(null);
          onClose({ startDate, endDate });
        }
      } else {
        startDate = day;
        endDate = null;
      }
    }

    this.props.onDatesChange({ startDate, endDate });
    onBlur();
  }

  onDayMouseEnter(day: any) {
    if (this.isTouchDevice) return;
    const { startDate, endDate, focusedInput, minimumNights } = this.props;
    const { hoverDate, visibleDays } = this.state;

    if (focusedInput) {
      let modifiers = {};
      modifiers = this.deleteModifier(modifiers, hoverDate, 'hovered');
      modifiers = this.addModifier(modifiers, day, 'hovered');

      if (startDate && !endDate && focusedInput === Constants.END_DATE) {
        if (isAfterDay(hoverDate, startDate)) {
          const endSpan = hoverDate.clone().add(1, 'day');
          modifiers = this.deleteModifierFromRange(modifiers, startDate, endSpan, 'hovered-span');
        }

        if (!this.isBlocked(day) && isAfterDay(day, startDate)) {
          const endSpan = day.clone().add(1, 'day');
          modifiers = this.addModifierToRange(modifiers, startDate, endSpan, 'hovered-span');
        }
      }

      if (!startDate && endDate && focusedInput === Constants.START_DATE) {
        if (isBeforeDay(hoverDate, endDate)) {
          modifiers = this.deleteModifierFromRange(modifiers, hoverDate, endDate, 'hovered-span');
        }

        if (!this.isBlocked(day) && isBeforeDay(day, endDate)) {
          modifiers = this.addModifierToRange(modifiers, day, endDate, 'hovered-span');
        }
      }

      if (startDate) {
        const startSpan = startDate.clone().add(1, 'day');
        const endSpan = startDate.clone().add(minimumNights + 1, 'days');
        modifiers = this.deleteModifierFromRange(modifiers, startSpan, endSpan, 'after-hovered-start');

        if (isSameDay(day, startDate)) {
          const newStartSpan = startDate.clone().add(1, 'day');
          const newEndSpan = startDate.clone().add(minimumNights + 1, 'days');
          modifiers =
            this.addModifierToRange(modifiers, newStartSpan, newEndSpan, 'after-hovered-start');
        }
      }

      this.setState({
        hoverDate: day,
        visibleDays: {
          ...visibleDays,
          ...modifiers,
        },
      });
    }
  }

  onDayMouseLeave(day: any) {
    const { startDate, endDate, minimumNights } = this.props;
    const { hoverDate, visibleDays } = this.state;
    if (this.isTouchDevice || !hoverDate) return;

    let modifiers = {};
    modifiers = this.deleteModifier(modifiers, hoverDate, 'hovered');

    if (startDate && !endDate && isAfterDay(hoverDate, startDate)) {
      const endSpan = hoverDate.clone().add(1, 'day');
      modifiers = this.deleteModifierFromRange(modifiers, startDate, endSpan, 'hovered-span');
    }

    if (!startDate && endDate && isAfterDay(endDate, hoverDate)) {
      modifiers = this.deleteModifierFromRange(modifiers, hoverDate, endDate, 'hovered-span');
    }

    if (startDate && isSameDay(day, startDate)) {
      const startSpan = startDate.clone().add(1, 'day');
      const endSpan = startDate.clone().add(minimumNights + 1, 'days');
      modifiers = this.deleteModifierFromRange(modifiers, startSpan, endSpan, 'after-hovered-start');
    }

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

    const newVisibleDays: any = {};
    Object.keys(visibleDays).sort().slice(0, numberOfMonths + 1).forEach((month) => {
      newVisibleDays[month] = visibleDays[month];
    });

    const prevMonth = currentMonth.clone().subtract(2, 'months');
    const prevMonthVisibleDays = getVisibleDays(prevMonth, 1, enableOutsideDays, true);

    this.setState({
      currentMonth: currentMonth.clone().subtract(1, 'month'),
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

    const newVisibleDays: any = {};
    Object.keys(visibleDays).sort().slice(1).forEach((month) => {
      newVisibleDays[month] = visibleDays[month];
    });

    const nextMonth = currentMonth.clone().add(numberOfMonths + 1, 'month');
    const nextMonthVisibleDays = getVisibleDays(nextMonth, 1, enableOutsideDays, true);

    this.setState({
      currentMonth: currentMonth.clone().add(1, 'month'),
      visibleDays: {
        ...newVisibleDays,
        ...this.getModifiers(nextMonthVisibleDays),
      },
    });

    onNextMonthClick();
  }

  onMultiplyScrollableMonths() {
    const { numberOfMonths, enableOutsideDays } = this.props;
    const { currentMonth, visibleDays } = this.state;

    const numberOfVisibleMonths = Object.keys(visibleDays).length;
    const nextMonth = currentMonth.clone().add(numberOfVisibleMonths, 'month');
    const newVisibleDays = getVisibleDays(nextMonth, numberOfMonths, enableOutsideDays, true);

    this.setState({
      visibleDays: {
        ...visibleDays,
        ...this.getModifiers(newVisibleDays),
      },
    });
  }

  getFirstFocusableDay(newMonth: any) {
    const { startDate, endDate, focusedInput, minimumNights, numberOfMonths } = this.props;

    let focusedDate = newMonth.clone().startOf('month');
    if (focusedInput === Constants.START_DATE && startDate) {
      focusedDate = startDate.clone();
    } else if (focusedInput === Constants.END_DATE && !endDate && startDate) {
      focusedDate = startDate.clone().add(minimumNights, 'days');
    } else if (focusedInput === Constants.END_DATE && endDate) {
      focusedDate = endDate.clone();
    }

    if (this.isBlocked(focusedDate)) {
      const days = [];
      const lastVisibleDay = newMonth.clone().add(numberOfMonths - 1, 'months').endOf('month');
      let currentDay = focusedDate.clone();
      while (!isAfterDay(currentDay, lastVisibleDay)) {
        currentDay = currentDay.clone().add(1, 'day');
        days.push(currentDay);
      }

      const viableDays = days.filter(day => !this.isBlocked(day));

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
    const {
      initialVisibleMonth,
      numberOfMonths,
      enableOutsideDays,
      orientation,
      startDate,
    } = nextProps;
    const initialVisibleMonthThunk: any =
      initialVisibleMonth || (startDate ? () => startDate : () => this.today);
    const currentMonth: any = initialVisibleMonthThunk;
    const withoutTransitionMonths = orientation === Constants.VERTICAL_SCROLLABLE;
    const visibleDays = this.getModifiers(
      getVisibleDays(currentMonth, numberOfMonths, enableOutsideDays, withoutTransitionMonths),
    );
    return { currentMonth, visibleDays };
  }

  addModifier(updatedDays: any, day: any, modifier: any) {
    const { numberOfMonths: numberOfVisibleMonths, enableOutsideDays, orientation } = this.props;
    const { currentMonth: firstVisibleMonth, visibleDays } = this.state;

    let currentMonth = firstVisibleMonth;
    let numberOfMonths = numberOfVisibleMonths;
    if (orientation !== Constants.VERTICAL_SCROLLABLE) {
      currentMonth = currentMonth.clone().subtract(1, 'month');
      numberOfMonths += 2;
    }
    if (!day || !isDayVisible(day, currentMonth, numberOfMonths, enableOutsideDays)) {
      return updatedDays;
    }

    const iso: any = toISODateString(day,null);

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
      const monthIso = toISOMonthString(day,null);
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

  addModifierToRange(updatedDays: any, start: any, end: any, modifier: any) {
    let days = updatedDays;

    let spanStart = start.clone();
    while (isBeforeDay(spanStart, end)) {
      days = this.addModifier(days, spanStart, modifier);
      spanStart = spanStart.clone().add(1, 'day');
    }

    return days;
  }

  deleteModifier(updatedDays: any, day: any, modifier: any) {
    const { numberOfMonths: numberOfVisibleMonths, enableOutsideDays, orientation } = this.props;
    const { currentMonth: firstVisibleMonth, visibleDays } = this.state;

    let currentMonth = firstVisibleMonth;
    let numberOfMonths = numberOfVisibleMonths;
    if (orientation !== Constants.VERTICAL_SCROLLABLE) {
      currentMonth = currentMonth.clone().subtract(1, 'month');
      numberOfMonths += 2;
    }
    if (!day || !isDayVisible(day, currentMonth, numberOfMonths, enableOutsideDays)) {
      return updatedDays;
    }

    const iso: any = toISODateString(day,null);

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
      const monthIso = toISOMonthString(day,null);
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

  deleteModifierFromRange(updatedDays: any, start: any, end: any, modifier: any) {
    let days = updatedDays;

    let spanStart = start.clone();
    while (isBeforeDay(spanStart, end)) {
      days = this.deleteModifier(days, spanStart, modifier);
      spanStart = spanStart.clone().add(1, 'day');
    }

    return days;
  }

  doesNotMeetMinimumNights(day: any) {
    const { startDate, isOutsideRange, focusedInput, minimumNights } = this.props;
    if (focusedInput !== Constants.END_DATE) return false;

    if (startDate) {
      const dayDiff = day.diff(startDate.clone().startOf('day').hour(12), 'days');
      return dayDiff < minimumNights && dayDiff >= 0;
    }
    return isOutsideRange(moment(day).subtract(minimumNights, 'days'));
  }

  isDayAfterHoveredStartDate(day: any) {
    const { startDate, endDate, minimumNights } = this.props;
    const { hoverDate }: any = this.state || {};
    return !!startDate && !endDate && !this.isBlocked(day) && isNextDay(hoverDate, day) &&
      minimumNights > 0 && isSameDay(hoverDate, startDate);
  }

  isEndDate(day: any) {
    return isSameDay(day, this.props.endDate);
  }

  isHovered(day: any) {
    const { hoverDate }: any = this.state || {};
    const { focusedInput } = this.props;
    return !!focusedInput && isSameDay(day, hoverDate);
  }

  isInHoveredSpan(day: any) {
    const { startDate, endDate } = this.props;
    const { hoverDate }: any = this.state || {};

    const isForwardRange = !!startDate && !endDate &&
      (day.isBetween(startDate, hoverDate) ||
        isSameDay(hoverDate, day));
    const isBackwardRange = !!endDate && !startDate &&
      (day.isBetween(hoverDate, endDate) ||
        isSameDay(hoverDate, day));

    const isValidDayHovered = hoverDate && !this.isBlocked(hoverDate);

    return (isForwardRange || isBackwardRange) && isValidDayHovered;
  }

  isInSelectedSpan(day: any) {
    const { startDate, endDate } = this.props;
    return day.isBetween(startDate, endDate);
  }

  isLastInRange(day: any) {
    return this.isInSelectedSpan(day) && isNextDay(day, this.props.endDate);
  }

  isStartDate(day: any) {
    return isSameDay(day, this.props.startDate);
  }

  isBlocked(day: any) {
    const { isDayBlocked, isOutsideRange } = this.props;
    return isDayBlocked(day) || isOutsideRange(day) || this.doesNotMeetMinimumNights(day);
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
      onOutsideClick,
      withPortal,
      enableOutsideDays,
      initialVisibleMonth,
      hideKeyboardShortcutsPanel,
      daySize,
      focusedInput,
      renderDay,
      renderCalendarInfo,
      onBlur,
      isFocused,
      showKeyboardShortcuts,
      isRTL,
    } = this.props;

    const { phrases, visibleDays } = this.state;

    return (
      <DayPicker
        ref={(ref) => { this.dayPicker = ref; }}
        orientation={orientation}
        enableOutsideDays={enableOutsideDays}
        modifiers={visibleDays}
        numberOfMonths={numberOfMonths}
        onDayClick={this.onDayClick}
        onDayMouseEnter={this.onDayMouseEnter}
        onDayMouseLeave={this.onDayMouseLeave}
        onPrevMonthClick={this.onPrevMonthClick}
        onNextMonthClick={this.onNextMonthClick}
        onMultiplyScrollableMonths={this.onMultiplyScrollableMonths}
        monthFormat={monthFormat}
        renderMonth={renderMonth}
        withPortal={withPortal}
        hidden={!focusedInput}
        initialVisibleMonth={initialVisibleMonth}
        daySize={daySize}
        onOutsideClick={onOutsideClick}
        navPrev={navPrev}
        navNext={navNext}
        renderDay={renderDay}
        renderCalendarInfo={renderCalendarInfo}
        hideKeyboardShortcutsPanel={hideKeyboardShortcutsPanel}
        isFocused={isFocused}
        getFirstFocusableDay={this.getFirstFocusableDay}
        onBlur={onBlur}
        showKeyboardShortcuts={showKeyboardShortcuts}
        phrases={phrases}
        isRTL={isRTL}
      />
    );
  }
}

// DayPickerRangeController.propTypes = propTypes;
// DayPickerRangeController.defaultProps = defaultProps;

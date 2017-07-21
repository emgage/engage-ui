import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
//import PropTypes from 'prop-types';
// import shallowCompare from 'react-addons-shallow-compare';
// import momentPropTypes from 'react-moment-proptypes';
// import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
//import moment from 'moment';
import * as cx from 'classnames';
import { addEventListener, removeEventListener } from 'consolidated-events';

import  CalendarDayPhrases  from './defaultPhrases';
//import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import CalendarMonth from './CalendarMonth';
import isTransitionEndSupported from '../utils/isTransitionEndSupported';
import getTransformStyles from '../utils/getTransformStyles';
import getCalendarMonthWidth from '../utils/getCalendarMonthWidth';
import toISOMonthString from '../utils/toISOMonthString';
import isAfterDay from '../utils/isAfterDay';

//import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import Constants from './constants';

import { DATEPICKER } from '../../ThemeIdentifiers';
import * as baseTheme from './../style/style.scss';


function getMonths(initialMonth: any, numberOfMonths: any, withoutTransitionMonths: any) {
  let month = initialMonth.clone();
  if (!withoutTransitionMonths) month = month.subtract(1, 'month');

  const months = [];
  for (let i = 0; i < (withoutTransitionMonths ? numberOfMonths : numberOfMonths + 2); i += 1) {
    months.push(month);
    month = month.clone().add(1, 'month');
  }

  return months;
}

export interface State { }
export interface Props {
  enableOutsideDays?: any,
  firstVisibleMonthIndex?: any,
  isAnimating?: any,
  modifiers?: any,
  numberOfMonths?: any,
  monthFormat?: any,
  orientation?: any,
  transformValue?: any,
  daySize?: any,
  onDayMouseEnter?: any,
  onDayMouseLeave?: any,
  onDayClick?: any,
  renderMonth?: any,
  renderDay?: any,
  onMonthTransitionEnd?: any,
  focusedDate?: any,
  isFocused?: any,
  phrases?: any,
  initialMonth?: any,
  theme?: any,
}

class CalendarMonthGrid extends React.Component<Props, State> {
  static defaultProps = {
    enableOutsideDays: false,
    firstVisibleMonthIndex: 0,
    initialMonth: {},
    isAnimating: false,
    numberOfMonths: 1,
    modifiers: {},
    orientation: Constants.HORIZONTAL_ORIENTATION,
    onDayClick() { },
    onDayMouseEnter() { },
    onDayMouseLeave() { },
    onMonthTransitionEnd() { },
    renderMonth: null,
    renderDay: null,
    transformValue: 'none',
    daySize: Constants.DAY_SIZE,
    focusedDate: null,
    isFocused: false,

    // i18n
    monthFormat: 'MMMM YYYY', // english locale
    phrases: CalendarDayPhrases,
  };
  container: any;
  eventHandle: any;
  isTransitionEndSupported: boolean;
  constructor(props: any) {
    super(props);
    const withoutTransitionMonths = props.orientation === Constants.VERTICAL_SCROLLABLE;
    this.state = {
      months: getMonths(props.initialMonth, props.numberOfMonths, withoutTransitionMonths),
    };

    this.isTransitionEndSupported = isTransitionEndSupported();
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
  }

  // static propTypes = ({
  //   enableOutsideDays: PropTypes.bool,
  //   firstVisibleMonthIndex: PropTypes.number,
  //   initialMonth: PropTypes.object,
  //   isAnimating: PropTypes.bool,
  //   numberOfMonths: PropTypes.number,
  //   modifiers: PropTypes.object,
  //   orientation: ScrollableOrientationShape,
  //   onDayClick: PropTypes.func,
  //   onDayMouseEnter: PropTypes.func,
  //   onDayMouseLeave: PropTypes.func,
  //   onMonthTransitionEnd: PropTypes.func,
  //   renderMonth: PropTypes.func,
  //   renderDay: PropTypes.func,
  //   transformValue: PropTypes.string,
  //   daySize: PropTypes.number,
  //   focusedDate: PropTypes.object, // indicates focusable day
  //   isFocused: PropTypes.bool, // indicates whether or not to move focus to focusable day

  //   // i18n
  //   monthFormat: PropTypes.string,
  //   phrases: PropTypes.shape(getPhrasePropTypes(CalendarDayPhrases)),
  // });


  componentDidMount() {
    this.eventHandle = addEventListener(
      this.container,
      'transitionend',
      this.onTransitionEnd,
    );
  }

  componentWillReceiveProps(nextProps: any) {
    const { initialMonth, numberOfMonths, orientation }: any = nextProps;
    const { months }: any = this.state;

    const hasMonthChanged: any = !this.props.initialMonth.isSame(initialMonth, 'month');
    const hasNumberOfMonthsChanged = this.props.numberOfMonths !== numberOfMonths;
    let newMonths = months;

    if (hasMonthChanged && !hasNumberOfMonthsChanged) {
      if (isAfterDay(initialMonth, this.props.initialMonth)) {
        newMonths = months.slice(1);
        newMonths.push(months[months.length - 1].clone().add(1, 'month'));
      } else {
        newMonths = months.slice(0, months.length - 1);
        newMonths.unshift(months[0].clone().subtract(1, 'month'));
      }
    }

    if (hasNumberOfMonthsChanged) {
      const withoutTransitionMonths = orientation === Constants.VERTICAL_SCROLLABLE;
      newMonths = getMonths(initialMonth, numberOfMonths, withoutTransitionMonths);
    }

    this.setState({
      months: newMonths,
    });
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return shallowCompare(this, nextProps, nextState);
  // }

  componentDidUpdate() {
    const { isAnimating, onMonthTransitionEnd }: any = this.props;

    // For IE9, immediately call onMonthTransitionEnd instead of
    // waiting for the animation to complete
    if (!this.isTransitionEndSupported && isAnimating) {
      onMonthTransitionEnd();
    }
  }

  componentWillUnmount() {
    removeEventListener(this.eventHandle);
  }

  onTransitionEnd() {
    this.props.onMonthTransitionEnd();
  }

  render() {
    const {
      enableOutsideDays,
      firstVisibleMonthIndex,
      isAnimating,
      modifiers,
      numberOfMonths,
      monthFormat,
      orientation,
      transformValue,
      daySize,
      onDayMouseEnter,
      onDayMouseLeave,
      onDayClick,
      renderMonth,
      renderDay,
      onMonthTransitionEnd,
      focusedDate,
      isFocused,
      phrases,
      theme,
    }: any = this.props;

    const { months }: any = this.state;
    const isVertical: any = orientation === Constants.VERTICAL_ORIENTATION;
    const isVerticalScrollable: any = orientation === Constants.VERTICAL_SCROLLABLE;
    const isHorizontal: any = orientation === Constants.HORIZONTAL_ORIENTATION;

    const className = cx(theme.CalendarMonthGrid, {
      [theme['CalendarMonthGrid--horizontal']]: isHorizontal,
      [theme['CalendarMonthGrid--vertical']]: isVertical,
      [theme['CalendarMonthGrid--vertical-scrollable']]: isVerticalScrollable,
      [theme['CalendarMonthGrid--animating']]: isAnimating,
    });

    const calendarMonthWidth = getCalendarMonthWidth(daySize);

    const width = isVertical || isVerticalScrollable ?
      calendarMonthWidth :
      (numberOfMonths + 2) * calendarMonthWidth;

    const style = {
      ...getTransformStyles(transformValue),
      width,
    };

    return (
      <div
        ref={(ref) => { this.container = ref; }}
        className={className}
        style={style}
        onTransitionEnd={onMonthTransitionEnd}
      >
        {months.map((month: any, i: any) => {
          const isVisible =
            (i >= firstVisibleMonthIndex) && (i < firstVisibleMonthIndex + numberOfMonths);
          const monthString = toISOMonthString(month, null);
          return (
            <CalendarMonth
              key={monthString}
              month={month}
              isVisible={isVisible}
              enableOutsideDays={enableOutsideDays}
              modifiers={modifiers[monthString]}
              monthFormat={monthFormat}
              orientation={orientation}
              onDayMouseEnter={onDayMouseEnter}
              onDayMouseLeave={onDayMouseLeave}
              onDayClick={onDayClick}
              renderMonth={renderMonth}
              renderDay={renderDay}
              daySize={daySize}
              focusedDate={isVisible ? focusedDate : null}
              isFocused={isFocused}
              phrases={phrases}
            />
          );
        })}
      </div>
    );
  }
}

export default themr(DATEPICKER, baseTheme)(CalendarMonthGrid) as ThemedComponentClass<Props, State>;


// CalendarMonthGrid.propTypes = propTypes;
// CalendarMonthGrid.defaultProps = defaultProps;

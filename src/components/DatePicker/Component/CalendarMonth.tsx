/* eslint react/no-array-index-key: 0 */

import * as React from 'react';
// import PropTypes from 'prop-types';
// import shallowCompare from 'react-addons-shallow-compare';
// import momentPropTypes from 'react-moment-proptypes';
// import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
//import moment from 'moment';
import * as cx from 'classnames';

import  CalendarDayPhrases  from './defaultPhrases';
// import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import CalendarDay from './CalendarDay';

import getCalendarMonthWeeks from '../utils/getCalendarMonthWeeks';
import isSameDay from '../utils/isSameDay';
import toISODateString from '../utils/toISODateString';

// import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import Constants from './constants';




export interface State {
  weeks: any,
}
export interface Props {
  month?: any,
  monthFormat?: any,
  orientation?: any,
  isVisible?: any,
  modifiers?: any,
  onDayClick?: any,
  onDayMouseEnter?: any,
  onDayMouseLeave?: any,
  renderMonth?: any,
  renderDay?: any,
  daySize?: any,
  focusedDate?: any,
  isFocused?: any,
  phrases?: any,
  enableOutsideDays?: any,
   
}

export default class CalendarMonth extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      weeks: getCalendarMonthWeeks(props.month, props.enableOutsideDays),
    };
  }

  // static propTypes = ({
  //   month: object,
  //   isVisible: bool,
  //   enableOutsideDays: bool,
  //   modifiers: object,
  //   orientation: ScrollableOrientationShape,
  //   daySize: number,
  //   onDayClick: func,
  //   onDayMouseEnter: func,
  //   onDayMouseLeave: func,
  //   renderMonth: func,
  //   renderDay: func,

  //   focusedDate: object, // indicates focusable day
  //   isFocused: bool, // indicates whether or not to move focus to focusable day

  //   // i18n
  //   monthFormat: string,
  //   phrases: shape(getPhrasePropTypes(CalendarDayPhrases)),
  // });

  static defaultProps = {
    month: {},
    isVisible: true,
    enableOutsideDays: false,
    modifiers: {},
    orientation: Constants.HORIZONTAL_ORIENTATION,
    daySize: Constants.DAY_SIZE,
    onDayClick() { },
    onDayMouseEnter() { },
    onDayMouseLeave() { },
    renderMonth: null,
    renderDay: null,

    focusedDate: null,
    isFocused: false,

    // i18n
    monthFormat: 'MMMM YYYY', // english locale
    phrases: CalendarDayPhrases,
  };

  componentWillReceiveProps(nextProps: any) {
    const { month, enableOutsideDays } = nextProps;
    if (!month.isSame(this.props.month)) {
      this.setState({
        weeks: getCalendarMonthWeeks(month, enableOutsideDays),
      });
    }
  }

  // shouldComponentUpdate(nextProps: any, nextState: any) {
  //   return shallowCompare(this, nextProps, nextState);
  // }

  render() {
    const {
      month,
      monthFormat,
      orientation,
      isVisible,
      modifiers,
      onDayClick,
      onDayMouseEnter,
      onDayMouseLeave,
      renderMonth,
      renderDay,
      daySize,
      focusedDate,
      isFocused,
      phrases,
    } = this.props;

    const { weeks } = this.state;
    const monthTitle = renderMonth ? renderMonth(month) : month.format(monthFormat);

    const calendarMonthClasses = cx('CalendarMonth', {
      'CalendarMonth--horizontal': orientation === Constants.HORIZONTAL_ORIENTATION,
      'CalendarMonth--vertical': orientation === Constants.VERTICAL_ORIENTATION,
      'CalendarMonth--vertical-scrollable': orientation === Constants.VERTICAL_SCROLLABLE,
    });

    return (
      <div className={calendarMonthClasses} data-visible={isVisible}>
        <table>
          <caption className="CalendarMonth__caption js-CalendarMonth__caption">
            <strong>{monthTitle}</strong>
          </caption>

          <tbody className="js-CalendarMonth__grid">
            {weeks.map((week: any, i: any) => (
              <tr key={i}>
                {week.map((day: any, dayOfWeek: any) => (
                  <CalendarDay
                    day={day}
                    daySize={daySize}
                    isOutsideDay={!day || day.month() !== month.month()}
                    tabIndex={isVisible && isSameDay(day, focusedDate) ? 0 : -1}
                    isFocused={isFocused}
                    key={dayOfWeek}
                    onDayMouseEnter={onDayMouseEnter}
                    onDayMouseLeave={onDayMouseLeave}
                    onDayClick={onDayClick}
                    renderDay={renderDay}
                    phrases={phrases}
                    modifiers={modifiers[toISODateString(day, null) as string]}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

// CalendarMonth.propTypes = propTypes;
// CalendarMonth.defaultProps = defaultProps;

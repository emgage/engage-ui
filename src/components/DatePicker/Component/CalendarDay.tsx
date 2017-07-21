import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
//import PropTypes from 'prop-types';
// import shallowCompare from 'react-addons-shallow-compare';
// import momentPropTypes from 'react-moment-proptypes';
// import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
//import moment from 'moment';
import * as cx from 'classnames';

import CalendarDayPhrases from './defaultPhrases';
//import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import getPhrase from '../utils/getPhrase';
import Constants from './constants';
import { DATEPICKER } from '../../ThemeIdentifiers';
import * as baseTheme from './../style/style.scss';

export interface State { }
export interface Props {
  day: any,
  daySize: any,
  isOutsideDay?: any,
  modifiers?: any,
  tabIndex?: any,
  renderDay?: Function,
  isFocused?: any,
  onDayMouseEnter?: any,
  onDayMouseLeave?: any,
  onDayClick?: any,
  // internationalization
  phrases?: any,
  theme?: any,
}

// static propTypes = ({
//   day,
//   daySize,
//   isOutsideDay,
//   modifiers,
//   isFocused,
//   tabIndex,
//   onDayClick,
//   onDayMouseEnter,
//   onDayMouseLeave,
//   renderDay,

//   // internationalization
//   phrases,
// }: Props) => {};

class CalendarDay extends React.Component<Props, State> {
  [x: string]: any;

  //   static propTypes = ({
  //   day: object,
  //   daySize: number,
  //   isOutsideDay: bool,
  //   modifiers: instanceOf(Set),
  //   isFocused: bool,
  //   tabIndex: oneOf([0, -1]),
  //   onDayClick: func,
  //   onDayMouseEnter: func,
  //   onDayMouseLeave: func,
  //   renderDay: func,

  //   // internationalization
  //   phrases: shape(getPhrasePropTypes(CalendarDayPhrases)),
  // });

  static defaultProps = {
    day: {},
    daySize: Constants.DAY_SIZE,
    isOutsideDay: false,
    modifiers: new Set(),
    isFocused: false,
    tabIndex: -1,
    onDayClick() { },
    onDayMouseEnter() { },
    onDayMouseLeave() { },
    renderDay: null,

    // internationalization
    phrases: CalendarDayPhrases,
  };

  // shouldComponentUpdate(nextProps: any, nextState: any) {
  //   return shallowCompare(this, nextProps, nextState);
  // }

  componentDidUpdate(prevProps: any): void {

    const { isFocused, tabIndex }: any = this.props;
    if (tabIndex === 0) {
      if (isFocused || tabIndex !== prevProps.tabIndex) {
        this.buttonRef.focus();
      }
    }
  }

  onDayClick(day: any, e: any) {
    const { onDayClick }: any = this.props;
    onDayClick(day, e);
  }

  onDayMouseEnter(day: any, e: any) {
    const { onDayMouseEnter }: any = this.props;
    onDayMouseEnter(day, e);
  }

  onDayMouseLeave(day: any, e: any) {
    const { onDayMouseLeave }: any = this.props;
    onDayMouseLeave(day, e);
  }

  render() {
    const {
      day,
      daySize,
      isOutsideDay,
      modifiers,
      renderDay,
      tabIndex,
      phrases: {
        chooseAvailableDate,
        dateIsUnavailable,
      },
      theme,
    } = this.props;

    if (!day) return <td />;

    const className = cx(theme.CalendarDay, {
      [theme['CalendarDay--outside']]: isOutsideDay,
    }, Array.from(modifiers, mod => theme[`CalendarDay--${mod}`]));

    const formattedDate = `${day.format('dddd')}, ${day.format('LL')}`;

    let ariaLabel = getPhrase(chooseAvailableDate, {
      date: formattedDate,
    });

    if (Constants.BLOCKED_MODIFIER in modifiers && modifiers[Constants.BLOCKED_MODIFIER](day)) {
      ariaLabel = getPhrase(dateIsUnavailable, { date: formattedDate });
    }

    const daySizeStyles = {
      width: daySize,
      height: daySize - 1,
    };

    return (
      <td className={className} style={daySizeStyles}>
        <button
          type="button"
          ref={(ref) => { this.buttonRef = ref; }}
          className={theme["CalendarDay__button"]}
          aria-label={ariaLabel}
          onMouseEnter={(e) => { this.onDayMouseEnter(day, e); }}
          onMouseLeave={(e) => { this.onDayMouseLeave(day, e); }}
          onMouseUp={(e) => { e.currentTarget.blur(); }}
          onClick={(e) => { this.onDayClick(day, e); }}
          tabIndex={tabIndex}
        >
          {renderDay ? renderDay(day) : day.format('D')}
        </button>
      </td>
    );
  }
}

export default themr(DATEPICKER, baseTheme)(CalendarDay) as ThemedComponentClass<Props, State>;

//  CalendarDay.propTypes = propTypes;
//  CalendarDay.defaultProps = defaultProps;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import moment from 'moment';
import cx from 'classnames';
import { themr } from 'react-css-themr';

import { CalendarDayPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import getPhrase from '../utils/getPhrase';

import { BLOCKED_MODIFIER, DAY_SIZE } from '../Constants';

import { DATEPICKER } from './../../ThemeIdentifiers';
import * as baseTheme from './../style/style.scss';

const propTypes = forbidExtraProps({
  day: momentPropTypes.momentObj,
  daySize: nonNegativeInteger,
  isOutsideDay: PropTypes.bool,
  modifiers: PropTypes.instanceOf(Set),
  isFocused: PropTypes.bool,
  tabIndex: PropTypes.oneOf([0, -1]),
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  renderDay: PropTypes.func,

  // internationalization
  phrases: PropTypes.shape(getPhrasePropTypes(CalendarDayPhrases)),

  theme: PropTypes.any,
});

const defaultProps = {
  day: moment(),
  daySize: DAY_SIZE,
  isOutsideDay: false,
  modifiers: new Set(),
  isFocused: false,
  tabIndex: -1,
  onDayClick() {},
  onDayMouseEnter() {},
  onDayMouseLeave() {},
  renderDay: null,
  
  // internationalization
  phrases: CalendarDayPhrases,
};

// @themr(DATEPICKER, baseTheme)
class CalendarDay extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidUpdate(prevProps) {
    const { isFocused, tabIndex } = this.props;
    if (tabIndex === 0) {
      if (isFocused || tabIndex !== prevProps.tabIndex) {
        this.buttonRef.focus();
      }
    }
  }

  onDayClick(day, e) {
    const { onDayClick } = this.props;
    onDayClick(day, e);
  }

  onDayMouseEnter(day, e) {
    const { onDayMouseEnter } = this.props;
    onDayMouseEnter(day, e);
  }

  onDayMouseLeave(day, e) {
    const { onDayMouseLeave } = this.props;
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

    const className = cx(theme['CalendarDay'], {
      [theme['CalendarDay--outside']]: isOutsideDay,
    }, Array.from(modifiers, mod => theme[`CalendarDay--${mod}`]));

    const formattedDate = `${day.format('dddd')}, ${day.format('LL')}`;

    let ariaLabel = getPhrase(chooseAvailableDate, {
      date: formattedDate,
    });

    if (BLOCKED_MODIFIER in modifiers && modifiers[BLOCKED_MODIFIER](day)) {
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

// export default CalendarDay;

export default themr(DATEPICKER, baseTheme)(CalendarDay);

CalendarDay.propTypes = propTypes;
CalendarDay.defaultProps = defaultProps;

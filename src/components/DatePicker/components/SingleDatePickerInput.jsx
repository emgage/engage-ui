import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import cx from 'classnames';

import { SingleDatePickerInputPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import { themr } from 'react-css-themr';

import DateInput from './DateInput';
import CloseButton from '../svg/close.svg';
import CalendarIcon from '../svg/calendar.svg';

import { DATEPICKER } from './../../ThemeIdentifiers';
import * as baseTheme from './../style/style.scss';

const propTypes = forbidExtraProps({
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string, // also used as label
  displayValue: PropTypes.string,
  inputValue: PropTypes.string,
  screenReaderMessage: PropTypes.string,
  focused: PropTypes.bool,
  isFocused: PropTypes.bool, // describes actual DOM focus
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  showCaret: PropTypes.bool,
  showClearDate: PropTypes.bool,
  customCloseIcon: PropTypes.node,
  showDefaultInputIcon: PropTypes.bool,
  customInputIcon: PropTypes.node,
  isRTL: PropTypes.bool,
  onChange: PropTypes.func,
  onClearDate: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDownShiftTab: PropTypes.func,
  onKeyDownTab: PropTypes.func,
  onKeyDownArrowDown: PropTypes.func,

  // i18n
  phrases: PropTypes.shape(getPhrasePropTypes(SingleDatePickerInputPhrases)),
  
  theme: PropTypes.any,
});

const defaultProps = {
  placeholder: 'Select Date',
  displayValue: '',
  inputValue: '',
  screenReaderMessage: '',
  focused: false,
  isFocused: false,
  disabled: false,
  required: false,
  readOnly: false,
  showCaret: false,
  showClearDate: false,
  showDefaultInputIcon: false,
  customCloseIcon: null,
  customInputIcon: null,
  isRTL: false,

  onChange() {},
  onClearDate() {},
  onFocus() {},
  onKeyDownShiftTab() {},
  onKeyDownTab() {},
  onKeyDownArrowDown() {},

  // i18n
  phrases: SingleDatePickerInputPhrases,
};

class SingleDatePickerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClearDateHovered: false,
    };

    this.onClearDateMouseEnter = this.onClearDateMouseEnter.bind(this);
    this.onClearDateMouseLeave = this.onClearDateMouseLeave.bind(this);
  }

  onClearDateMouseEnter() {
    this.setState({
      isClearDateHovered: true,
    });
  }

  onClearDateMouseLeave() {
    this.setState({
      isClearDateHovered: false,
    });
  }

  render() {
    const { isClearDateHovered } = this.state;
    const {
      id,
      placeholder,
      displayValue,
      inputValue,
      focused,
      isFocused,
      disabled,
      required,
      readOnly,
      showCaret,
      showClearDate,
      showDefaultInputIcon,
      phrases,
      onClearDate,
      onChange,
      onFocus,
      onKeyDownShiftTab,
      onKeyDownTab,
      onKeyDownArrowDown,
      screenReaderMessage,
      customCloseIcon,
      customInputIcon,
      isRTL,
      theme,
    } = this.props;

    const inputIcon = customInputIcon || (<CalendarIcon />);
    const closeIcon = customCloseIcon || (<CloseButton />);
    const screenReaderText = screenReaderMessage || phrases.keyboardNavigationInstructions;

    return (
      <div
        className={cx(theme['SingleDatePickerInput'], {
          [theme['SingleDatePickerInput--rtl']]: isRTL,
        })}
      >
        {(showDefaultInputIcon || customInputIcon !== null) && (
          <button
            type="button"
            className={theme["SingleDatePickerInput__calendar-icon"]}
            disabled={disabled}
            aria-label={phrases.focusStartDate}
            onClick={onFocus}
          >
            {inputIcon}
          </button>
        )}
        <DateInput
          id={id}
          placeholder={placeholder} // also used as label
          displayValue={displayValue}
          inputValue={inputValue}
          screenReaderMessage={screenReaderText}
          focused={focused}
          isFocused={isFocused}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          showCaret={showCaret}
          onChange={onChange}
          onFocus={onFocus}
          onKeyDownShiftTab={onKeyDownShiftTab}
          onKeyDownTab={onKeyDownTab}
          onKeyDownArrowDown={onKeyDownArrowDown}
        />

        {showClearDate && (
          <button
            type="button"
            className={cx(theme['SingleDatePickerInput__clear-date'], {
              [theme['SingleDatePickerInput__clear-date--hide']]: !displayValue,
              [theme['SingleDatePickerInput__clear-date--hover']]: isClearDateHovered,
            })}
            aria-label={phrases.clearDate}
            onMouseEnter={this.onClearDateMouseEnter}
            onMouseLeave={this.onClearDateMouseLeave}
            onClick={onClearDate}
          >
            <div className={theme["DateRangePickerInput__close"]}>
              {closeIcon}
            </div>
          </button>
        )}
      </div>
    );
  }
}

export default themr(DATEPICKER, baseTheme)(SingleDatePickerInput);



SingleDatePickerInput.propTypes = propTypes;
SingleDatePickerInput.defaultProps = defaultProps;

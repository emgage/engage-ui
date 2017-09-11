import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import cx from 'classnames';
import throttle from 'lodash/throttle';
import isTouchDevice from 'is-touch-device';
import { themr } from 'react-css-themr';

import { DATEPICKER } from './../../ThemeIdentifiers';
import * as baseTheme from './../style/style.scss';

const propTypes = forbidExtraProps({
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string, // also used as label
  displayValue: PropTypes.string,
  inputValue: PropTypes.string,
  screenReaderMessage: PropTypes.string,
  focused: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  showCaret: PropTypes.bool,

  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDownShiftTab: PropTypes.func,
  onKeyDownTab: PropTypes.func,

  onKeyDownArrowDown: PropTypes.func,
  onKeyDownQuestionMark: PropTypes.func,

  // accessibility
  isFocused: PropTypes.bool, // describes actual DOM focus

  theme: PropTypes.any,
});

const defaultProps = {
  placeholder: 'Select Date',
  displayValue: '',
  inputValue: '',
  screenReaderMessage: '',
  focused: false,
  disabled: false,
  required: false,
  readOnly: null,
  showCaret: false,

  onChange() {},
  onFocus() {},
  onKeyDownShiftTab() {},
  onKeyDownTab() {},

  onKeyDownArrowDown() {},
  onKeyDownQuestionMark() {},

  // accessibility
  isFocused: false,
};

class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateString: '',
      isTouchDevice: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    this.setState({ isTouchDevice: isTouchDevice() });
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.displayValue && nextProps.displayValue) {
      this.setState({
        dateString: '',
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { focused, isFocused } = this.props;
    if (prevProps.focused === focused && prevProps.isFocused === isFocused) return;

    if (focused && isFocused) {
      this.inputRef.focus();
      this.inputRef.select();
    } else {
      this.inputRef.blur();
    }
  }

  onChange(e) {
    const { onChange, onKeyDownQuestionMark } = this.props;
    const dateString = e.target.value;

    // In Safari, onKeyDown does not consistently fire ahead of onChange. As a result, we need to
    // special case the `?` key so that it always triggers the appropriate callback, instead of
    // modifying the input value
    if (dateString[dateString.length - 1] === '?') {
      onKeyDownQuestionMark(e);
    } else {
      this.setState({ dateString });
      onChange(dateString);
    }
  }

  onKeyDown(e) {
    e.stopPropagation();

    const {
      onKeyDownShiftTab,
      onKeyDownTab,
      onKeyDownArrowDown,
      onKeyDownQuestionMark,
    } = this.props;

    const { key } = e;
    if (key === 'Tab') {
      if (e.shiftKey) {
        onKeyDownShiftTab(e);
      } else {
        onKeyDownTab(e);
      }
    } else if (key === 'ArrowDown') {
      onKeyDownArrowDown(e);
    } else if (key === '?') {
      e.preventDefault();
      onKeyDownQuestionMark(e);
    }
  }

  render() {
    const {
      dateString,
      isTouchDevice: isTouch,
    } = this.state;
    const {
      id,
      placeholder,
      displayValue,
      inputValue,
      screenReaderMessage,
      focused,
      showCaret,
      onFocus,
      disabled,
      required,
      readOnly,
      theme,
    } = this.props;

    const displayText = displayValue || inputValue || dateString || placeholder || '';
    const value = inputValue || displayValue || dateString || '';
    const screenReaderMessageId = `DateInput__screen-reader-message-${id}`;

    return (
      <div
        className={cx(theme['DateInput'], {
          [theme['DateInput--with-caret']]: showCaret && focused,
          [theme['DateInput--disabled']]: disabled,
        })}
      >
        <input
          aria-label={placeholder}
          className={theme["DateInput__input needsclick"]}
          type="text"
          id={id}
          name={id}
          ref={(ref) => { this.inputRef = ref; }}
          value={value}
          onChange={this.onChange}
          onKeyDown={throttle(this.onKeyDown, 300)}
          onFocus={onFocus}
          placeholder={placeholder}
          autoComplete="off"
          disabled={disabled}
          readOnly={typeof readOnly === 'boolean' ? readOnly : isTouch}
          required={required}
          aria-describedby={screenReaderMessage && screenReaderMessageId}
        />

        {screenReaderMessage && (
          <p id={screenReaderMessageId} className={theme["screen-reader-only"]}>
            {screenReaderMessage}
          </p>
        )}

        <div
          className={cx(theme['DateInput__display-text'], {
            [theme['DateInput__display-text--has-input']]: !!value,
            [theme['DateInput__display-text--focused']]: focused,
            [theme['DateInput__display-text--disabled']]: disabled,
          })}
        >
          {displayText}
        </div>
      </div>
    );
  }
}

export default themr(DATEPICKER, baseTheme)(DateInput);


DateInput.propTypes = propTypes;
DateInput.defaultProps = defaultProps;

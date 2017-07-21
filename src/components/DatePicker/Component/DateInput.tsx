import * as React from 'react';
//import PropTypes from 'prop-types';
// import { forbidExtraProps } from 'airbnb-prop-types';
import * as  cx from 'classnames';
import { themr, ThemedComponentClass } from 'react-css-themr';
// import * as  throttle from 'lodash/throttle';
// import isTouchDevice from 'is-touch-device';

import { DATEPICKER } from '../../ThemeIdentifiers';
import * as baseTheme from './../style/style.scss';

export interface State {
  dateString: any,
  isTouchDevice: any,
}
export interface Props {
  displayValue?: any,
  focused?: any,
  isFocused?: any,
  onChange?: any,
  onKeyDownQuestionMark?: any,
  onKeyDownShiftTab?: any,
  onKeyDownTab?: any,
  onKeyDownArrowDown?: any,
  id?: any,
  placeholder?: any,
  inputValue?: any,
  screenReaderMessage?: any,
  showCaret?: any,
  onFocus?: any,
  disabled?: any,
  required?: any,
  readOnly?: any,
  theme?: any,
}

class DateInput extends React.Component<Props, State> {
  static defaultProps = {
    placeholder: 'Select Date',
    displayValue: '',
    inputValue: '',
    screenReaderMessage: '',
    focused: false,
    disabled: false,
    required: false,
    readOnly: null,
    showCaret: false,

    onChange() { },
    onFocus() { },
    onKeyDownShiftTab() { },
    onKeyDownTab() { },

    onKeyDownArrowDown() { },
    onKeyDownQuestionMark() { },

    // accessibility
    isFocused: false,
  };

  inputRef: any;
  constructor(props: any) {
    super(props);
    this.state = {
      dateString: '',
      isTouchDevice: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  // static propTypes = ({
  //   id: PropTypes.string.isRequired,
  //   placeholder: PropTypes.string, // also used as label
  //   displayValue: PropTypes.string,
  //   inputValue: PropTypes.string,
  //   screenReaderMessage: PropTypes.string,
  //   focused: PropTypes.bool,
  //   disabled: PropTypes.bool,
  //   required: PropTypes.bool,
  //   readOnly: PropTypes.bool,
  //   showCaret: PropTypes.bool,

  //   onChange: PropTypes.func,
  //   onFocus: PropTypes.func,
  //   onKeyDownShiftTab: PropTypes.func,
  //   onKeyDownTab: PropTypes.func,

  //   onKeyDownArrowDown: PropTypes.func,
  //   onKeyDownQuestionMark: PropTypes.func,

  //   // accessibility
  //   isFocused: PropTypes.bool, // describes actual DOM focus
  // });


  componentDidMount() {
    this.setState({ isTouchDevice: false });  //isTouchDevice()
  }

  componentWillReceiveProps(nextProps: any) {
    if (!this.props.displayValue && nextProps.displayValue) {
      this.setState({
        dateString: '',
      });
    }
  }

  componentDidUpdate(prevProps: any) {
    const { focused, isFocused } = this.props;
    if (prevProps.focused === focused && prevProps.isFocused === isFocused) return;

    if (focused && isFocused) {
      this.inputRef.focus();
      this.inputRef.select();
    } else {
      this.inputRef.blur();
    }
  }

  onChange(e: any) {
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

  onKeyDown(e: any) {
    e.stopPropagation();

    const {
      onKeyDownShiftTab,
      onKeyDownTab,
      onKeyDownArrowDown,
      onKeyDownQuestionMark,
    } = this.props;

    const { key }: any = e;
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
        className={cx(theme.DateInput, {
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
          onFocus={onFocus}
          placeholder={placeholder}
          autoComplete="off"
          disabled={disabled}
          readOnly={typeof readOnly === 'boolean' ? readOnly : isTouch}
          required={required}
          aria-describedby={screenReaderMessage && screenReaderMessageId}
        />
{/*input*/}
{/*onKeyDown={throttle(this.onKeyDown, 300)}*/} 
        {screenReaderMessage && (
          <p id={screenReaderMessageId} className="screen-reader-only">
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

export default themr(DATEPICKER, baseTheme)(DateInput) as ThemedComponentClass<Props, State>;

// DateInput.propTypes = propTypes;
// DateInput.defaultProps = defaultProps;

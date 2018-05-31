import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { autobind } from '@shopify/javascript-utilities/decorators';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { classNames } from '@shopify/react-utilities/styles';

import Labelled, { Action, helpTextID, errorID, labelID } from '../Labelled';
import Connected from '../Connected';
import { TEXT_FIELD } from '../ThemeIdentifiers';

import * as baseTheme from './TextField.scss';
import Resizer from './Resizer';
import Spinner from './Spinner';

export type Type = 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url' | 'date' | 'datetime-local' | 'month' | 'time' | 'week';

export interface State {
  height?: number | null;
  focused?: boolean;
}

export interface Props {
  // Text to display before value.
  prefix?: React.ReactNode;
  // Text to display after value.
  suffix?: React.ReactNode;
  // Hint text to display.
  placeholder?: string;
  // Initial value for the input.
  customValue?: string;
  // Additional hint text to display.
  helpText?: React.ReactNode;
  // display the TextCounter.
  enableTextCounter?: boolean;
  // Label for the input.
  label: string;
  // Adds an action to the label.
  labelAction?: Action;
  // Visually hide the label.
  labelHidden?: boolean;
  // Disable the input.
  disabled?: boolean;
  // Disable editing of the input.
  readOnly?: boolean;
  // Automatically focus the input.
  autoFocus?: boolean;
  // Allow for multiple lines of input.
  multiline?: boolean | number;
  // Error to display beneath the label.
  errors?: [string];
  // An element connected to the right of the input.
  connectedRight?: React.ReactNode;
  // An element connected to the left of the input
  connectedLeft?: React.ReactNode;
  // Determine type of input. Available options: text | email | number | password | search | tel | url | date | datetime-local | month | time | week
  customType?: Type;
  // Name of the input.
  customName?: string;
  // ID for the input.
  customId?: string;
  // Limit increment value for numeric and date-time inputs.
  step?: number;
  // Enable automatic completion by the browser.
  autoComplete?: boolean;
  // Maximum value for a numeric or date-time input.
  max?: number;
  // Maximum character length for an input.
  maxLength?: number;
  // Minimum value for a numeric or date-time input.
  min?: number;
  // Minimum character length for an input.
  minLength?: number;
  // A regular expression to check the value against.
  pattern?: string;
  // To make it required or not.
  required?: boolean;
  // Indicate whether value should have spelling checked.
  spellCheck?: boolean;
  // To make it resizable or not.
  resizable?: boolean;
  // To provide styling.
  customStyle?: React.CSSProperties;
  // Theme to be injected via css-themr.
  theme?: any;
  // Callback when value is changed.
  onChange?(value: string): void;
  // Callback when input is focused.
  onFocus?(e?: React.FormEvent<HTMLElement>): void;
  // Callback when focus is removed	.
  onBlur?(e?: React.FormEvent<HTMLElement>): void;
}

const getUniqueID = createUniqueIDFactory('TextField');

class TextField extends React.PureComponent<Props, State> {
  state: State = { height: null };

  private input: HTMLElement;

  render() {
    const {
      customId = getUniqueID(),
      customValue = '',
      placeholder,
      disabled,
      readOnly,
      autoFocus,
      customType,
      customName,
      errors,
      multiline,
      connectedRight,
      connectedLeft,
      label,
      labelAction,
      labelHidden,
      helpText,
      enableTextCounter,
      maxLength,
      prefix,
      suffix,
      required,
      theme,
      onFocus,
      onBlur,
      autoComplete,
      customStyle,
      resizable,
      ...rest
    } = this.props;

    const { height } = this.state;

    const className = classNames(
      theme.textField,
      Boolean(customValue) && theme.hasValue,
      disabled && theme.disabled,
      readOnly && theme.readOnly,
      errors && theme.error,
      multiline && theme.multiline,
      resizable && theme.resizable
    );

    const prefixMarkup = prefix
      ? <div onClick={this.handleInputFocus} className={theme.prefix} id={`${customId}prefix`}>{prefix}</div>
      : null;

    const suffixMarkup = suffix
      ? <div onClick={this.handleInputFocus} className={theme.suffix} id={`${customId}suffix`}>{suffix}</div>
      : null;

    const spinnerMarkup = customType === 'number'
      ? <Spinner onClick={this.handleInputFocus} onChange={this.handleNumberChange} />
      : null;

    const componentStyle = (multiline && height) ? { height, ...customStyle } : customStyle;

    const resizer = multiline === null
      ? null
      :(<Resizer
          contents={customValue || placeholder}
          currentHeight={height}
          minimumLines={typeof multiline === 'number' ? multiline : 3}
          onHeightChange={this.handleExpandingResize}
        />
      );

    let counterTextMarkup;
    if (enableTextCounter) {
      const maxLengthString = maxLength ? '/' + maxLength : '';
      const textCount = this.props.customValue ? this.props.customValue.toString().length : 0;
      const minLengthRed = this.props.minLength ? this.props.minLength : 0;
      counterTextMarkup =
        <div className={theme.counterText} id={`${customId}counter`}>
          <span className={minLengthRed > textCount ? theme.red : ''}>{textCount}</span>
          {maxLengthString}
        </div>;
    }

    const describedBy: string[] = [];
    if (errors) { describedBy.push(errorID(customId)); }
    if (helpText) { describedBy.push(helpTextID(customId)); }

    const labelledBy = [labelID(customId)];
    if (prefix) { labelledBy.push(`${customId}Prefix`); }
    if (suffix) { labelledBy.push(`${customId}Suffix`); }

    const input = React.createElement(multiline ? 'textarea' : 'input', {
      ...rest,
      customName,
      customId,
      customType,
      disabled,
      readOnly,
      autoFocus,
      customValue,
      placeholder,
      required,
      onFocus: this.handleInputOnFocus,
      onBlur: this.handleInputOnBlur,
      style: componentStyle,
      formNoValidate: true,
      autoComplete: normalizeAutoComplete(autoComplete),
      className: theme.input,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown,
      ref: this.setInput,
      'aria-required': required ? true : false,
      'aria-describedby': describedBy.length ? describedBy.join(' ') : undefined,
      'aria-labelledby': labelledBy.join(' '),
      'aria-invalid': Boolean(errors),
    });

    const hasValue = (!!this.props.customValue && this.props.customValue.length > 0);

    return (
      <Labelled
        label={label}
        customId={customId}
        errors={errors}
        action={labelAction}
        labelHidden={labelHidden}
        helpText={helpText}
        focused={this.state.focused}
        hasValue={hasValue}
        required={required}
      >
        <Connected
          left={connectedLeft}
          right={connectedRight}
        >
          <div className={className}>
            {prefixMarkup}
            {input}
            {suffixMarkup}
            {spinnerMarkup}
            <div className={theme.backdrop} />
            {resizer}
          </div>
        </Connected>
        {counterTextMarkup}
      </Labelled>
    );
  }

  @autobind
  private setInput(input: HTMLElement) {
    this.input = input;
  }

  @autobind
  private handleNumberChange(steps: number) {
    const { onChange, customValue, step = 1, min = -Infinity, max = Infinity } = this.props;
    if (onChange == null) { return; }

    const numericValue = customValue ? parseFloat(customValue) : 0;
    if (isNaN(numericValue)) { return; }

    const newValue = Math.min(max, Math.max(numericValue + (steps * step), min));
    onChange(String(newValue));
  }

  @autobind
  private handleExpandingResize(height: number) {
    this.setState({ height });
  }

  @autobind
  private onChange(event: React.FormEvent<HTMLInputElement>) {
    const { onChange } = this.props;
    if (onChange == null) { return; }
    const value = this.props.customValue ? this.props.customValue : '';
    const maxLength = this.props.maxLength ? this.props.maxLength : Number.POSITIVE_INFINITY;
    if (value.length < maxLength && event.currentTarget.value.length <= maxLength) {
      onChange(event.currentTarget.value);
    }
  }

  @autobind
  private onKeyDown(e: any) {
    const { onChange } = this.props;
    if (onChange == null) { return; }
    const value = this.props.customValue ? this.props.customValue : '';
    const maxLength = this.props.maxLength ? this.props.maxLength : Number.POSITIVE_INFINITY;
    if (value.length >= maxLength && e.keyCode === 8) {
      onChange(e.currentTarget.value.slice(0, e.currentTarget.value.length - 1));
      e.preventDefault();
    }
  }

  @autobind
  private handleInputOnFocus(e: React.FormEvent<HTMLElement>) {
    this.setState((prevState: State) => ({
      ...prevState,
      focused: true,
    }));

    const { onFocus } = this.props;
    if (onFocus == null) { return; }
    onFocus(e);
  }

  @autobind
  private handleInputOnBlur(e: React.FormEvent<HTMLElement>) {
    this.setState((prevState: State) => ({
      ...prevState,
      focused: false,
    }));

    const { onBlur } = this.props;
    if (onBlur == null) { return; }
    onBlur(e);
  }

  @autobind
  private handleInputFocus() {
    this.input.focus();
  }
}

function normalizeAutoComplete(autoComplete?: boolean) {
  if (autoComplete == null) { return autoComplete; }
  return autoComplete ? 'on' : 'off';
}

export { TextField as UnthemedTextField };
export default themr(TEXT_FIELD, baseTheme)(TextField) as ThemedComponentClass<Props, State>;

import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { autobind } from '@shopify/javascript-utilities/decorators';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { classNames } from '@shopify/react-utilities/styles';

import Labelled, { Action, helpTextID, errorID, labelID } from '../Labelled';
import Spinner from '../Spinner';
import Connected from '../Connected';
import { TEXT_FIELD } from '../ThemeIdentifiers';

import * as baseTheme from './TextField.scss';
import Resizer from './Resizer';
import SpinnerButtons from './SpinnerButtons';

export type Type = 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url' | 'date' | 'datetime-local' | 'month' | 'time' | 'week';

export interface State {
  height?: number | null;
  focused?: boolean;
  value?: string | undefined;
}

export interface Props {
  // Text to display before value.
  prefix?: React.ReactNode;
  // Text to display after value.
  suffix?: React.ReactNode;
  // Hint text to display.
  placeholder?: string;
  // Initial value for the input.
  value?: string;
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
  // Display loading indicator
  loading?: boolean;
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
  type?: Type;
  // Name of the input.
  name?: string;
  // ID for the input.
  componentId?: string;
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
  componentStyle?: React.CSSProperties;
  // Theme to be injected via css-themr.
  theme?: any;
  // Callback when value is changed.
  onChange?(value: string): void;
  // Callback when input is focused.
  onFocus?(e?: React.FormEvent<HTMLElement>): void;
  // Callback when focus is removed	.
  onBlur?(e?: React.FormEvent<HTMLElement>): void;
  // Callback when value is inserted in Input.
  onInput?(e?: React.ChangeEvent<HTMLSelectElement>): void;
  // Check alphanumeric value and convert into capital
  capital?: boolean;
  // Check alphanumeric value
  alphanumeric?: boolean;
}

const getUniqueID = createUniqueIDFactory('TextField');

class TextField extends React.PureComponent<Props, State> {
  state: State = { height: null, value: '' };

  private input: HTMLElement;

  constructor(props: Props) {
    super(props);
    this.state = {
      height: null,
      value: props.value ? props.value : ''
    };
  }

  // tslint:disable-next-line:function-name
  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    this.setState({
      value: nextProps.value
    });
  }

  render() {
    const {
      componentId = getUniqueID(),
      value = '',
      placeholder,
      disabled,
      readOnly,
      autoFocus,
      type,
      name,
      errors,
      multiline,
      connectedRight,
      connectedLeft,
      label,
      labelAction,
      labelHidden,
      loading,
      helpText,
      enableTextCounter,
      maxLength,
      prefix,
      suffix,
      required,
      theme,
      onFocus,
      onBlur,
      onInput,
      autoComplete,
      componentStyle,
      resizable,
      ...rest
    } = this.props;

    const { height } = this.state;

    const className = classNames(
      theme.textField,
      Boolean(value) && theme.hasValue,
      disabled && theme.disabled,
      readOnly && theme.readOnly,
      errors && theme.error,
      multiline && theme.multiline,
      resizable && theme.resizable,
      loading && theme.loading
    );

    const prefixMarkup = prefix
      ? <div onClick={this.handleInputFocus} className={theme.prefix} id={`${componentId}prefix`}>{prefix}</div>
      : null;

    const suffixMarkup = suffix
      ? <div onClick={this.handleInputFocus} className={theme.suffix} id={`${componentId}suffix`}>{suffix}</div>
      : null;

    const spinnerButtonsMarkup = type === 'number'
      ? <SpinnerButtons onClick={this.handleInputFocus} onChange={this.handleNumberChange} />
      : null;

    const newComponentStyle = (multiline && height) ? { height, ...componentStyle } : componentStyle;

    const resizer = multiline === null
      ? null
      :(<Resizer
          contents={value || placeholder}
          currentHeight={height}
          minimumLines={typeof multiline === 'number' ? multiline : 3}
        />
      );

    let counterTextMarkup;
    if (enableTextCounter) {
      const maxLengthString = maxLength ? '/' + maxLength : '';
      const textCount = this.props.value ? this.props.value.toString().length : 0;
      const minLengthTest = this.props.minLength ? this.props.minLength : 0;
      counterTextMarkup =
        <div className={theme.counterText} id={`${componentId}counter`}>
          <span className={minLengthTest > textCount ? theme.invalid : ''}>{textCount}</span>
          {maxLengthString}
        </div>;
    }

    const describedBy: string[] = [];
    if (errors) { describedBy.push(errorID(componentId)); }
    if (helpText) { describedBy.push(helpTextID(componentId)); }

    const labelledBy = [labelID(componentId)];
    if (prefix) { labelledBy.push(`${componentId}Prefix`); }
    if (suffix) { labelledBy.push(`${componentId}Suffix`); }

    const inputEleClass = classNames(
      theme.input,
      !label && theme.noLabel
    );

    const input = React.createElement(multiline ? 'textarea' : 'input', {
      ...rest,
      name,
      type,
      disabled,
      readOnly,
      autoFocus,
      placeholder,
      required,
      id: componentId,
      value: this.state.value,
      onFocus: this.handleInputOnFocus,
      onBlur: this.handleInputOnBlur,
      style: newComponentStyle,
      formNoValidate: true,
      autoComplete: normalizeAutoComplete(autoComplete),
      className: inputEleClass,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown,
      ref: this.setInput,
      'aria-required': required ? true : false,
      'aria-describedby': describedBy.length ? describedBy.join(' ') : undefined,
      'aria-labelledby': labelledBy.join(' '),
      'aria-invalid': Boolean(errors),
    });

    const hasValue = (!!this.props.value && this.props.value.length > 0) || this.state.value !== '';

    const labelStyle = classNames(
      theme.labelStyle,
      (hasValue || this.state.focused) && theme.labelHasValue,
      disabled && theme.labelDisabled
    );

    return (
      <Labelled
        label={label}
        componentId={componentId}
        errors={errors}
        action={labelAction}
        labelHidden={labelHidden}
        helpText={helpText}
        disabled={disabled}
        focused={this.state.focused}
        hasValue={hasValue}
        required={required}
        componentClass={labelStyle}
      >
        <Connected
          left={connectedLeft}
          right={connectedRight}
        >
          <div className={className}>
            {prefixMarkup}
            {input}
            {suffixMarkup}
            {spinnerButtonsMarkup}
            {loading && <div className={theme.spinnerWrapper}><Spinner componentSize="small" componentColor="disabled" /></div>}
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
    const { onChange, value, step = 1, min = -Infinity, max = Infinity } = this.props;
    if (onChange == null) { return; }

    const numericValue = value ? parseFloat(value) : 0;
    if (isNaN(numericValue)) { return; }

    const newValue = Math.min(max, Math.max(numericValue + (steps * step), min));
    onChange(String(newValue));
  }

  @autobind
  private onChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ value: event.currentTarget.value });
    const { onChange } = this.props;
    if (onChange == null) { return; }
    const value = this.props.value ? this.props.value : '';
    const maxLength = this.props.maxLength ? this.props.maxLength : Number.POSITIVE_INFINITY;
    const alphaRegex = RegExp(/^[A-Za-z0-9\b]+$/,'g');
    if (event.currentTarget.value.length <= maxLength) {
      if (this.props.capital && alphaRegex.test(event.currentTarget.value)) {
        onChange(event.currentTarget.value.toUpperCase());
      }else if (this.props.alphanumeric && alphaRegex.test(event.currentTarget.value)) {
        onChange(event.currentTarget.value);
      }else {
        if ((this.props.capital || this.props.alphanumeric) && event.currentTarget.value.length > 0) {
          onChange(value);
          return ;
        }
        onChange(event.currentTarget.value);
      }
    }else {
      onChange(value);
    }
  }

  @autobind
  private onKeyDown(e: any) {
    const { onChange } = this.props;
    if (onChange == null) { return; }
    const value = this.props.value ? this.props.value : '';
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

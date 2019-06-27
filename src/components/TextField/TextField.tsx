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
  // Check alphanumeric value
  alphanumeric?: boolean;
  // Enable automatic completion by the browser.
  autoComplete?: boolean;
  // Automatically focus the input.
  autoFocus?: boolean;
  // Visually hide the border.
  backdropHidden?: boolean;
  // Check alphanumeric value and convert into capital
  capital?: boolean;
  componentClass?: string;
  // ID for the input.
  componentId?: string;
  // To provide styling.
  componentStyle?: React.CSSProperties;
  // An element connected to the right of the input.
  connectedRight?: React.ReactNode;
  // An element connected to the left of the input
  connectedLeft?: React.ReactNode;
  // Disable the input.
  disabled?: boolean;
  // display the TextCounter.
  enableTextCounter?: boolean;
  // Error to display beneath the label.
  errors?: [string];
  // Function return all errors
  getErrors?(errors:any, name?:string): void;
  // Additional hint text to display.
  helpText?: React.ReactNode;
  // Label for the input.
  label?: string;
  // Adds an action to the label.
  labelAction?: Action;
  // Visually hide the label.
  labelHidden?: boolean;
  // Display loading indicator
  loading?: boolean;
  // Maximum value for a numeric or date-time input.
  max?: number;
  // Maximum character length for an input.
  maxLength?: number;
  // Minimum value for a numeric or date-time input.
  min?: number;
  // Minimum character length for an input.
  minLength?: number;
  // Allow for multiple lines of input.
  multiline?: boolean | number;
  // Name of the input.
  name?: string;
  // Callback when value is changed.
  onChange?(value: string, e?: React.FormEvent<HTMLElement>): void;
  // Callback when input is focused.
  onFocus?(e?: React.FormEvent<HTMLElement>): void;
  // Callback when focus is removed	.
  onBlur?(e?: React.FormEvent<HTMLElement>): void;
  // Callback when value is inserted in Input.
  onInput?(e?: React.ChangeEvent<HTMLSelectElement>): void;
  // A regular expression to check the value against.
  pattern?: string;
  // Hint text to display.
  placeholder?: string;
  // Text to display before value.
  prefix?: React.ReactNode;
  // To make it required or not.
  required?: boolean;
  // Disable editing of the input.
  readOnly?: boolean;
  // To make it resizable or not.
  resizable?: boolean;
  // Show or hide increment / decrement icon
  showNumberIcon?: boolean;
  // Text to display after value.
  suffix?: React.ReactNode;
  // Limit increment value for numeric and date-time inputs.
  step?: number;
  // Indicate whether value should have spelling checked.
  spellCheck?: boolean;
  // Theme to be injected via css-themr.
  theme?: any;
  // Determine type of input. Available options: text | email | number | password | search | tel | url | date | datetime-local | month | time | week
  type?: Type;
  // Initial value for the input.
  value?: string;
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

    if (JSON.stringify(this.props.errors) !== JSON.stringify(nextProps.errors)) {
      const { getErrors } = this.props;
      getErrors && getErrors(nextProps.errors, nextProps.name);
    }
  }

  render() {
    const {
      autoComplete,
      autoFocus,
      backdropHidden,
      componentId = getUniqueID(),
      componentClass = '',
      componentStyle = {},
      connectedRight,
      connectedLeft,
      disabled,
      enableTextCounter,
      errors,
      helpText,
      label = '',
      labelAction,
      labelHidden,
      loading,
      maxLength,
      multiline,
      name,
      placeholder,
      prefix,
      onFocus,
      onBlur,
      onInput,
      readOnly,
      resizable,
      required,
      showNumberIcon = true,
      suffix,
      theme,
      type,
      value = '',
      ...rest
    } = this.props;

    const { height } = this.state;

    const className = classNames(
      componentClass,
      theme.textField,
      Boolean(value) && theme.hasValue,
      disabled && theme.disabled,
      readOnly && theme.readOnly,
      backdropHidden && theme.backdropHidden,
      errors && theme.error,
      labelHidden && theme.labelHidden,
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

    const spinnerButtonsMarkup = type === 'number' && showNumberIcon
      ? <SpinnerButtons onClick={this.handleInputFocus} onChange={this.handleNumberChange} theme={theme} />
      : null;

    const newComponentStyle = (multiline && height) ? { height, ...componentStyle } : componentStyle;

    const resizer = multiline === null
      ? null
      :(<Resizer
          contents={value || placeholder}
          currentHeight={height}
          minimumLines={typeof multiline === 'number' ? multiline : 3}
          theme={theme}
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
      !label && theme.noLabel,
      this.state.value && theme.notEmpty
    );

    const input = React.createElement(multiline ? 'textarea' : 'input', {
      ...rest,
      name,
      type,
      disabled,
      readOnly,
      autoFocus,
      required,
      placeholder : !label ? placeholder : '',
      id: componentId,
      value: this.state.value,
      onFocus: this.handleInputOnFocus,
      onBlur: this.handleInputOnBlur,
      style: newComponentStyle,
      formNoValidate: true,
      autoComplete: normalizeAutoComplete(autoComplete),
      className: inputEleClass,
      onChange: this.onChange,
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
        labelWrapperStyle={multiline && theme.multiLineLabel}
        theme={theme}
      >
        <Connected
          left={connectedLeft}
          right={connectedRight}
          theme={theme}
        >
          <div className={className}>
            {prefixMarkup}
            {input}
            {suffixMarkup}
            {spinnerButtonsMarkup}
            {loading && <div className={theme.spinnerWrapper}><Spinner componentSize="small" componentColor="disabled" theme={theme} /></div>}
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
    const maxLength = this.props.maxLength ? this.props.maxLength : Number.POSITIVE_INFINITY;
    const alphaRegex = RegExp(/^[A-Za-z0-9\b]+$/,'g');
    const newValue = event.currentTarget.value.length <= maxLength ? event.currentTarget.value : event.currentTarget.value.substr(0, maxLength);
    if (this.props.capital && alphaRegex.test(newValue)) {
      onChange(newValue.toUpperCase());
    }else if (this.props.alphanumeric && alphaRegex.test(newValue)) {
      onChange(newValue);
    }else {
      if ((this.props.capital || this.props.alphanumeric) && newValue.length > 0) {
        const oldValueArray = [...newValue];
        const newValueArray: any[] = [];
        oldValueArray.forEach((char: string) => {
          if (RegExp(/^[A-Za-z0-9\b]+$/,'g').test(char)) {
            newValueArray.push(this.props.capital ? char.toUpperCase() : char);
          }
        });
        onChange(newValueArray.join(''));
        return ;
      }
      onChange(newValue, event);
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

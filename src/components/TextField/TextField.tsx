import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { autobind } from '@shopify/javascript-utilities/decorators';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { classNames, variationName } from '@shopify/react-utilities/styles';

import Labelled, { Action, helpTextID, errorID, labelID } from '../Labelled';
import Spinner from '../Spinner';
import Connected from '../Connected';
import AutoSuggestText, { IStateProps } from '../Picker/AutoSuggestText';
import { IAutoSuggestMethods } from '../Picker/Picker';
import { TEXT_FIELD } from '../ThemeIdentifiers';

import * as baseTheme from './TextField.scss';
import Resizer from './Resizer';
import SpinnerButtons from './SpinnerButtons';
import Icon from '../Icon/Icon';
// import Tooltip from '../Tooltip/Tooltip'

export type Type = 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url' | 'date' | 'datetime-local' | 'month' | 'time' | 'week';
export type ComponentHeight = 'slim' | 'large';
export type PlaceholderAlign = 'left' | 'right';

export interface State {
  height?: number | null;
  focused?: boolean;
  value?: string | undefined;
  onHover?: boolean
}

export interface Props {
  autoSuggest?: boolean;
  autoSuggestMethods?: IAutoSuggestMethods;
  stateProps?: IStateProps;
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
  errors?: [string] | null;
  // Function return all errors
  getErrors?(errors: any, name?: string): void;
  hasValue?: boolean;
  // Additional hint text to display.
  helpText?: React.ReactNode;
  itemSelected?: boolean;
  isFocused?: boolean;
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
  // Callback when input is Key.
  onKeyDown?(e: React.FormEvent<HTMLElement> | KeyboardEvent): void;
  // Callback when focus is removed	.
  onBlur?(e?: React.FormEvent<HTMLElement>): void;
  // Callback when value is inserted in Input.
  onInput?(e?: React.ChangeEvent<HTMLSelectElement>): void;
  // Callback when value is inserted in Input. (return when user stop typing)
  onKeyUp?(e: React.FormEvent<HTMLElement> | KeyboardEvent): void;
  // A regular expression to check the value against.
  pattern?: string;
  // Hint text to display.
  placeholder?: string;
  // Placeholder text alignment
  placeholderAlign?: PlaceholderAlign;
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
  type: Type;
  // Initial value for the input.
  value?: string;
  // number of rows for textarea
  rows?: number;
  componentHeight?: ComponentHeight;
  markIfRequired?: boolean
}

const getUniqueID = createUniqueIDFactory('TextField');

let timeout: any = null;
class TextField extends React.PureComponent<Props, State> {
  state: State = { height: null, value: '' };

  private input: HTMLElement;
  private prefixRef: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      height: null,
      value: props.value ? props.value : '',
      onHover:false,
    };
    this.prefixRef = React.createRef();
  }
  get labelComponentStyle() {
    const { prefix } = this.props;
    const marginLeft = (this.prefixRef?.current?.offsetWidth || 0);
    if (prefix && marginLeft === 0) {
      return {};
    }
    return { marginLeft: marginLeft + 5 };
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
      autoFocus = false,
      autoSuggest = false,
      autoSuggestMethods,
      backdropHidden = false,
      componentId = getUniqueID(),
      componentClass = '',
      componentStyle = {},
      connectedRight,
      connectedLeft,
      disabled = false,
      enableTextCounter = false,
      errors,
      hasValue: propHasValue = false,
      helpText,
      isFocused = false,
      label = '',
      labelAction,
      labelHidden = false,
      loading = false,
      maxLength,
      multiline,
      name,
      placeholder,
      placeholderAlign = 'right',
      prefix,
      onKeyDown,
      onFocus,
      onBlur,
      onInput,
      onKeyUp,
      readOnly = false,
      resizable = false,
      required = false,
      showNumberIcon = true,
      suffix,
      theme,
      type,
      value = '',
      componentHeight = 'large',
      markIfRequired,
      ...rest
    } = this.props;

    const { height } = this.state;
    const hasValue = (!!this.props.value && this.props.value.length > 0) || this.state.value;
    const className = classNames(
      componentClass,
      theme.textField,
      (hasValue || propHasValue) && theme.hasValue,
      disabled && theme.disabled,
      readOnly && theme.readOnly,
      backdropHidden && theme.backdropHidden,
      errors && theme.error,
      (labelHidden || !this.props.label) && theme.labelHidden,
      multiline && theme.multiline,
      resizable && theme.resizable,
      loading && theme.loading,
      (this.state.focused || isFocused) && theme.focused,
      componentHeight && theme[variationName('Height', componentHeight)],
      type === 'number' && !disabled && !readOnly && showNumberIcon && theme.numberField
    );
    const backdropClassName = classNames(
      theme.backdrop,
    )

    const prefixMarkup = prefix
      ? <div ref={this.prefixRef} onClick={this.handleInputFocus} className={theme.prefix} id={`${componentId}prefix`}>{prefix}</div>
      : null;

    const suffixMarkup = (!readOnly && suffix)
      ? <div onClick={this.handleInputFocus} className={theme.suffix} id={`${componentId}suffix`}>{suffix}</div>
      : null;

      // const errorMarkup = (!readOnly && errors)
      // ? <Tooltip  preferredPosition='above'  theme={{'wrapper':theme.tip}} content={errors}><Icon componentClass={theme.errorIcon} source='errorIcon'></Icon></Tooltip>
      // : null;
       const errorMarkup = (!readOnly && errors)
      ? <Icon componentClass={theme.errorIcon} source='errorIcon'></Icon>
      : null;

    const spinnerButtonsMarkup = type === 'number' && !disabled && !readOnly && showNumberIcon
      ? <SpinnerButtons onClick={this.handleInputFocus} onChange={this.handleNumberChange} theme={theme} />
      : null;

    const newComponentStyle = (multiline && height) ? { height, ...componentStyle } : componentStyle;

    const resizer = multiline === null
      ? null
      : (<Resizer
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
          <span className={minLengthTest > textCount ? theme.invalid : ''}>{textCount === 0 ? minLengthTest : textCount}</span>
          {maxLengthString}
        </div>;
    }

    const describedBy: string[] = [];
    if (errors) { describedBy.push(errorID(componentId)); }
    if (helpText) { describedBy.push(helpTextID(componentId)); }

    const labelledBy = [labelID(componentId)];
    // Do not apply suffix or prefix in textfield component. Should be done in its components respectively
    // if (prefix) { labelledBy.push(`${componentId}Prefix`); }
    // if (suffix) { labelledBy.push(`${componentId}Suffix`); }

    const inputEleClass = classNames(
      theme.input,
      !label && theme.noLabel,
      this.state.value && theme.notEmpty,
      componentHeight && theme[variationName('Height', componentHeight)],
      placeholder && String(placeholderAlign) === 'right' && theme.placeholderAlignRight
    );

    const input = React.createElement(multiline ? 'textarea' : 'input', {
      ...rest,
      name,
      type,
      disabled,
      readOnly,
      autoFocus,
      required,
      maxLength,
      placeholder,
      max: type === 'date' ? '9999-12-31' : type === 'datetime-local' ? '9999-12-31T00:00' : null,
      min: type === 'date' ? '0000-01-01' : type === 'datetime-local' ? '0000-01-01T00:00' : null,
      id: componentId,
      value: this.state.value,
      onFocus: this.handleInputOnFocus,
      onKeyDown: this.handleInputOnKeyDown,
      onBlur: this.handleInputOnBlur,
      onKeyUp: this.handleInputOnKeyUp,
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

    const inputValue = autoSuggest ?
      <AutoSuggestText
        autoSuggestMethods={autoSuggestMethods}
        stateProps={this.props.stateProps}
      />
      : input;

    const labelStyle = classNames(
      theme.labelStyle,
      componentHeight === 'slim' && theme.labelStyleSlim,
      (hasValue || this.state.focused) && theme.labelHasValue,
      disabled && theme.labelDisabled,
      prefix && theme.prefix
    );

    return (
      <Labelled
        onClick={this.handleInputFocus}
        autoSuggest={autoSuggest}
        label={label}
        componentId={componentId}
        errors={errors}
        action={labelAction}
        labelHidden={(labelHidden || !this.props.label)}
        helpText={helpText}
        disabled={disabled}
        focused={this.state.focused || isFocused}
        hasValue={Boolean(hasValue || propHasValue)}
        required={required}
        componentClass={labelStyle}
        theme={theme}
        readOnly={readOnly}
        labelComponentStyle={!(this.state.focused || isFocused) && (!Boolean(hasValue || propHasValue)) && this.labelComponentStyle || {}}
        markIfRequired={markIfRequired}
        onHover={this.state.onHover}
      >
        <Connected
          left={connectedLeft}
          right={connectedRight}
        >
         <div  onMouseEnter={() => this.setState({ onHover: true })} onMouseLeave={() => this.setState({ onHover: false })} className={className}>
            {spinnerButtonsMarkup}
            <div onClick={()=>this.setState({ onHover: false })} className={backdropClassName} />
            {prefixMarkup}
            {inputValue}
            {loading && <div className={theme.spinnerWrapper} id={`${componentId}Spinner`}><Spinner componentSize="small" componentColor="disabled" /></div>}
            {suffixMarkup}
            {errorMarkup}
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
    const { onChange, value, step = 1, min = -Infinity, max = Infinity} = this.props;
    if (onChange == null) { return; }

    const numericValue = value ? parseFloat(value) : 0;
    if (isNaN(numericValue)) { return; }

    const newValue = Math.min(max, Math.max(numericValue + (steps * step), min));
    onChange(String(newValue));
  }

  @autobind
  private onChange(event: React.FormEvent<HTMLInputElement>) {
    const { onChange, type, min = -Infinity, max= Infinity } = this.props;
    if (onChange == null) { this.setState({ value: event.currentTarget.value }); return; }
    const maxLength = this.props.maxLength ? this.props.maxLength : Number.POSITIVE_INFINITY;
    const alphaRegex = RegExp(/^[A-Za-z0-9\b]+$/, 'g');
    const newValue = event.currentTarget.value.length <= maxLength ? event.currentTarget.value : event.currentTarget.value.substr(0, maxLength);
    if (this.props.capital && alphaRegex.test(newValue)) {
      onChange(newValue.toUpperCase());
      this.setState({ value: newValue.toUpperCase() });
    } else if (this.props.alphanumeric && alphaRegex.test(newValue)) {
      onChange(newValue);
      this.setState({ value: newValue });
    }else if(type === "number"){
        const decimalLength = newValue.split(".")[1]?.length
        const verifyValueMinMax = String((Math.min(max, Math.max(parseFloat(newValue), min))).toFixed(decimalLength));
        if(newValue === "") {
          onChange("");
          this.setState({ value: "" });
        }
        else if(verifyValueMinMax !== "NaN") {
          if(parseFloat(verifyValueMinMax) === parseFloat(newValue)) {
            onChange(newValue);
            this.setState({ value: newValue });
          }
        }
    } else {
      if ((this.props.capital || this.props.alphanumeric) && newValue.length > 0) {
        const oldValueArray = [...newValue];
        const newValueArray: any[] = [];
        oldValueArray.forEach((char: string) => {
          if (RegExp(/^[A-Za-z0-9\b]+$/, 'g').test(char)) {
            newValueArray.push(this.props.capital ? char.toUpperCase() : char);
          }
        });
        onChange(newValueArray.join(''));
        this.setState({ value: newValueArray.join('') });
        return;
      }
      onChange(newValue, event);
      this.setState({ value: newValue });
    }
  }

  @autobind
  private handleInputOnFocus(e: React.FormEvent<HTMLElement>) {
    const { onFocus, readOnly } = this.props;
    this.setState((prevState: State) => ({
      ...prevState,
      focused: readOnly ? false : true,
    }));

    if (onFocus == null) { return; }
    onFocus(e);
  }

  @autobind
  private handleInputOnKeyDown(e: React.KeyboardEvent<HTMLElement> | KeyboardEvent) {
    if(e.keyCode === 69 && this.props.type === "number") { // prevent e in number input
      e.preventDefault(); 
      return;
    }
    const { onKeyDown, readOnly } = this.props;

    this.setState((prevState: State) => ({
      ...prevState,
      focused: readOnly ? false : true,
    }));

    if (onKeyDown == null) { return; }
    onKeyDown(e);
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
  private handleInputOnKeyUp(e: React.FormEvent<HTMLElement> | KeyboardEvent | any) {
    const { onKeyUp, readOnly } = this.props;

    this.setState((prevState: State) => ({
      ...prevState,
      focused: readOnly ? false : true,
    }));

    if (onKeyUp == null) { return; }
    clearTimeout(timeout);

    e.persist();

    // Make a new timeout set to go off in 1000ms (1 second)
    timeout = setTimeout(() => {
      onKeyUp(e);
    },                   1000);
  }

  @autobind
  private handleInputFocus() {
    if (this.props.autoSuggest && this.props.autoSuggestMethods) {
      const inputRef = this.props.autoSuggestMethods.getInputReference();
      inputRef && inputRef.focus();
    } else {
      this.input.focus();
    }
  }
}

function normalizeAutoComplete(autoComplete?: boolean) {
  if (autoComplete == null) { return autoComplete; }
  return autoComplete ? 'on' : 'off';
}

export { TextField as UnthemedTextField };
export default themr(TEXT_FIELD, baseTheme)(TextField) as ThemedComponentClass<Props, State>;

import * as React from 'react';
import { themr } from 'react-css-themr';
import autobind from '@shopify/javascript-utilities/autobind';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {classNames} from '@shopify/react-utilities/styles';

import Labelled, {Action, helpTextID, errorID, labelID} from '../Labelled';
import Connected from '../Connected';
import { TEXT_FIELD } from '../ThemeIdentifiers';

import * as baseTheme from './TextField.scss';

import Resizer from './Resizer';
import Spinner from './Spinner';

export type Type = 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url' | 'date' | 'datetime-local' | 'month' | 'time' | 'week';

export interface State {
  height?: number | null,
  focused?: boolean,
}

export interface Props {
  prefix?: React.ReactNode,
  suffix?: React.ReactNode,
  placeholder?: string,
  value?: string,
  helpText?: React.ReactNode,
  label: string,
  labelAction?: Action,
  labelHidden?: boolean,
  disabled?: boolean,
  readOnly?: boolean,
  autoFocus?: boolean,
  multiline?: boolean | number,
  errors?: [string],
  connectedRight?: React.ReactNode,
  connectedLeft?: React.ReactNode,
  type?: Type,
  name?: string,
  id?: string,
  step?: number,
  autoComplete?: boolean,
  max?: number,
  maxLength?: number,
  min?: number,
  minLength?: number,
  pattern?: string,
  required?: boolean,
  spellCheck?: boolean,
  style?: React.CSSProperties,
  theme?: any,
  onChange?(value: string): void,
  onFocus?(): void,
  onBlur?(e?: any): void,
}

const getUniqueID = createUniqueIDFactory('TextField');

class TextField extends React.PureComponent<Props, State> {
  state: State = {height: null};

  private input: HTMLElement;

  render() {
    const {
      id = getUniqueID(),
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
      helpText,
      prefix,
      suffix,
      required,
      theme,
      onFocus,
      onBlur,
      autoComplete,
      style,
      ...rest,
    } = this.props;

    const {height} = this.state;

    const className = classNames(
      theme.TextField,
      Boolean(value) && theme.hasValue,
      disabled && theme.disabled,
      readOnly && theme.readOnly,
      errors && theme.error,
      multiline && theme.multiline,
    );

    const prefixMarkup = prefix
      ? <div onClick={this.handleInputFocus} className={theme.Prefix} id={`${id}Prefix`}>{prefix}</div>
      : null;

    const suffixMarkup = suffix
      ? <div onClick={this.handleInputFocus} className={theme.Suffix} id={`${id}Suffix`}>{suffix}</div>
      : null;

    const spinnerMarkup = type === 'number'
      ? <Spinner onClick={this.handleInputFocus} onChange={this.handleNumberChange} />
      : null;

    let componentStyle = (multiline && height) ? {height, ...style} : style;

    const resizer = multiline != null
      ? (
        <Resizer
          contents={value || placeholder}
          currentHeight={height}
          minimumLines={typeof multiline === 'number' ? multiline : 1}
          onHeightChange={this.handleExpandingResize}
        />
      )
      : null;

    const describedBy: string[] = [];
    if (errors) { describedBy.push(errorID(id)); }
    if (helpText) { describedBy.push(helpTextID(id)); }

    const labelledBy = [labelID(id)];
    if (prefix) { labelledBy.push(`${id}Prefix`); }
    if (suffix) { labelledBy.push(`${id}Suffix`); }

    const input = React.createElement(multiline ? 'textarea' : 'input', {
      ...rest,
      name,
      id,
      type,
      disabled,
      readOnly,
      autoFocus,
      value,
      placeholder,
      onFocus: this.handleInputOnFocus,
      onBlur: this.handleInputOnBlur,
      style: componentStyle,
      formNoValidate: true,
      autoComplete: normalizeAutoComplete(autoComplete),
      className: theme.Input,
      onChange: this.handleChange,
      ref: this.setInput,
      required,
      'aria-required': required ? true : false,
      'aria-describedby': describedBy.length ? describedBy.join(' ') : undefined,
      'aria-labelledby': labelledBy.join(' '),
      'aria-invalid': Boolean(errors),
    });

    const hasValue = (!!this.props.value && this.props.value.length > 0);

    return (
      <Labelled
        label={label}
        id={id}
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
            <div className={theme.Backdrop} />
            {resizer}
          </div>
        </Connected>
      </Labelled>
    );
  }

  @autobind
  private setInput(input: HTMLElement) {
    this.input = input;
  }

  @autobind
  private handleNumberChange(steps: number) {
    const {onChange, value, step = 1, min = -Infinity, max = Infinity} = this.props;
    if (onChange == null) { return; }

    const numericValue = value ? parseFloat(value) : 0;
    if (isNaN(numericValue)) { return; }

    const newValue = Math.min(max, Math.max(numericValue + (steps * step), min));
    onChange(String(newValue));
  }

  @autobind
  private handleExpandingResize(height: number) {
    this.setState({height});
  }

  @autobind
  private handleChange(event: React.FormEvent<HTMLInputElement>) {
    const {onChange} = this.props;
    if (onChange == null) { return; }
    onChange(event.currentTarget.value);
  }

  @autobind
  private handleInputOnFocus() {
    this.setState((prevState: State) => ({
      ...prevState,
      focused: true,
    }));

    const {onFocus} = this.props;
    if (onFocus == null) { return; }
    onFocus();
  }

  @autobind
  private handleInputOnBlur(e: any) {
    this.setState((prevState: State) => ({
      ...prevState,
      focused: false,
    }));

    const {onBlur} = this.props;
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

export default themr(TEXT_FIELD, baseTheme)(TextField);
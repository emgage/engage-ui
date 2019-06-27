import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { autobind } from '@shopify/javascript-utilities/decorators';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { classNames } from '@shopify/react-utilities/styles';
import * as Autosuggest from 'react-autosuggest';

import { PICKER } from '../ThemeIdentifiers';
import Labelled, { Action, helpTextID } from '../Labelled';
import Spinner from '../Spinner';
import Icon  from '../Icon';

import AutoSuggestText from './AutoSuggestText';
import { IAutoSuggestMethods, IItemList } from './Picker';
import * as baseTheme from './Picker.scss';

export interface IStateProps {
  chipListState: IItemList[];
  suggestions: Autosuggest[];
  inputProps: Autosuggest.InputProps;
  value?: string;
}

export interface State {
  height?: number | null;
  focused?: boolean;
}

export interface Props {
  autoSuggest?: boolean;
  autoSuggestMethods?: IAutoSuggestMethods;
  // Visually hide the border.
  backdropHidden?: boolean;
  // ID for the input.
  componentId?: string;
  // Disable the input.
  disabled?: boolean;
  // Additional hint text to display.
  helpText?: React.ReactNode;
  itemSelected?: boolean;
  // Label for the input.
  label: string;
  // Adds an action to the label.
  labelAction?: Action;
  // Visually hide the label.
  labelHidden?: boolean;
  // Display loading indicator
  loading?: boolean;
  // Allow for multiple lines of input.
  multiline?: boolean | number;
  // Callback when value is changed.
  onChange?(value: string): void;
  // Callback when input is focused.
  onFocus?(e?: React.FormEvent<HTMLElement>): void;
  // Callback when focus is removed	.
  onBlur?(e?: React.FormEvent<HTMLElement>): void;
  // Callback when value is inserted in Input.
  onInput?(e?: React.ChangeEvent<HTMLSelectElement>): void;
  // Hint text to display.
  placeholder?: string;
  // Disable editing of the input.
  readOnly?: boolean;
  // To make it required or not.
  required?: boolean;
  // Show or hide icon
  showIcon?: boolean;
  stateProps?: IStateProps;
  // Theme to be injected via css-themr.
  theme?: any;
  // Initial value for the input.
  value?: string;
}

const getUniqueID = createUniqueIDFactory('PickerTextField');

class PickerTextField extends React.PureComponent<Props, State> {
  state: State = { height: null };

  // private input: HTMLElement;

  render() {
    const {
      autoSuggest,
      autoSuggestMethods,
      backdropHidden,
      componentId = getUniqueID(),
      disabled,
      helpText,
      itemSelected,
      label = '',
      labelAction,
      labelHidden,
      loading,
      multiline,
      placeholder,
      readOnly,
      required,
      showIcon,
      theme,
      value = '',
      ...rest
    } = this.props;

    const className = classNames(
      theme.pickerTextField,
      Boolean(value) && theme.hasValue,
      disabled && theme.disabled,
      readOnly && theme.readOnly,
      backdropHidden && theme.backdropHidden,
      labelHidden && theme.labelHidden,
      // theme.error,
      theme.multiline,
      loading && theme.loading
    );

    const describedBy: string[] = [];
    if (helpText) { describedBy.push(helpTextID(componentId)); }

    const inputEleClass = classNames(
      theme.input,
      !label && theme.noLabel
      // this.state.value && theme.notEmpty
    );

    const input = React.createElement('input', {
      ...rest,
      name,
      value,
      placeholder,
      required,
      formNoValidate: true,
      className: inputEleClass,
      onChange: this.handleChange,
      onFocus: this.handleInputOnFocus,
      onBlur: this.handleInputOnBlur,
      // ref: this.setInput,
      'aria-required': required ? true : false,
    });

    const hasValue = (!!this.props.value && this.props.value.length > 0);

    const inputValue = autoSuggest ?
      <AutoSuggestText
        autoSuggestMethods={autoSuggestMethods}
        stateProps={this.props.stateProps}
      />
      : input;

    const labelStyle = classNames(
      theme.labelStyle,
      (hasValue || this.state.focused) && theme.labelHasValue,
      disabled && theme.labelDisabled
    );

    return (
      <Labelled
        label={label}
        componentId={'textfield!!!' + label} // TODO: What is up with this ID?
        action={labelAction}
        labelHidden={labelHidden}
        helpText={helpText}
        disabled={disabled}
        focused={this.state.focused}
        hasValue={hasValue}
        required={required}
        componentClass={labelStyle}
        labelWrapperStyle={multiline && theme.multiLineLabel}
      >
        <div className={className}>
          {itemSelected && <div className={theme.customPlaceholder}>{placeholder}</div> }
          {inputValue}
          {showIcon && <Icon componentClass={theme.icon} source="users" /> }
          {loading && <div className={theme.spinnerWrapper}><Spinner componentSize="small" componentColor="disabled" /></div>}
          <div className={theme.backdrop} />
        </div>
      </Labelled>
    );
  }

  // @autobind
  // private setInput(input: HTMLElement) {
  //   this.input = input;
  // }

  @autobind
  private handleChange(event: React.FormEvent<HTMLInputElement>) {
    const { onChange } = this.props;
    if (onChange == null) { return; }
    onChange(event.currentTarget.value);
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

}

// export { PickerTextField as UnthemedPickerTextField };
export default themr(PICKER, baseTheme)(PickerTextField) as ThemedComponentClass<Props, State>;

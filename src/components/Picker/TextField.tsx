import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import autobind from '@shopify/javascript-utilities/autobind';
import { classNames } from '@shopify/react-utilities/styles';
import AutoSuggestText from './AutoSuggestText';

import Labelled from '../Labelled';
import { TEXT_FIELD } from '../ThemeIdentifiers';

import * as baseTheme from './TextField.scss';

export type Type = 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url' | 'date' | 'datetime-local' | 'month' | 'time' | 'week';

export interface State {
  height?: number | null;
  focused?: boolean;
}

export interface Props {
  placeholder?: string;
  value?: string;
  label: string;
  required?: boolean;
  theme?: any;
  autoSuggest?: boolean;
  autoSuggestMethods?: object[];
  itemsList?: object[];
  stateProps?: {chipListState: any, suggestions: any, inputProps: object, value?: any};
  onChange?(value: string): void;
}

class TextField extends React.PureComponent<Props, State> {
  state: State = { height: null };
  private input: HTMLElement;

  render() {
    const {
      value = '',
      placeholder,
      label,
      required,
      theme,
      autoSuggest,
      itemsList,
      autoSuggestMethods,
    } = this.props;

    const className = classNames(
      theme.textField,
      Boolean(value) && theme.hasValue,
      theme.disabled,
      theme.readOnly,
      theme.error,
      theme.multiline,
      theme.backdrop
    );
    const input = React.createElement('input', {
      name,
      value,
      placeholder,
      required,
      formNoValidate: true,
      className: theme.input,
      onChange: this.handleChange,
      ref: this.setInput,
      'aria-required': required ? true : false,
    });

    const inputValue = autoSuggest ?
      <AutoSuggestText
        placeholder={placeholder}
        itemsList={itemsList}
        autoSuggestMethods={autoSuggestMethods}
        stateProps={this.props.stateProps}
      />
      : input;
    const hasValue = (!!this.props.value && this.props.value.length > 0);

    return (
      <Labelled
        label={label}
        id={'textfield!!!'}
        action={undefined}
        focused={this.state.focused}
        hasValue={hasValue}
        required={required}
      >
        <div id={'lookatme!!'}
          className={className}
        >
        { inputValue }
        </div>
      </Labelled>
    );
  }

  @autobind
  private setInput(input: HTMLElement) {
    this.input = input;
  }
  @autobind
  private handleChange(event: React.FormEvent<HTMLInputElement>) {
    const { onChange } = this.props;
    if (onChange == null) { return; }
    onChange(event.currentTarget.value);
  }
}

export { TextField as UnthemedTextField };
export default themr(TEXT_FIELD, baseTheme)(TextField) as ThemedComponentClass<Props, State>;

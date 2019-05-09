import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { classNames } from '@shopify/react-utilities/styles';

import { Error, helpTextID } from '../Choice';
import FlexBox from '../FlexBox';
import Message from '../Message';

import { CHECKBOX } from '../ThemeIdentifiers';

import * as baseTheme from './Checkbox.scss';

export interface Props {
  // Label for the checkbox
  label?: string;
  // Visually hide the label
  labelHidden?: boolean;
  // Checkbox is selected or not
  checked?: boolean;
  // Set a custom class
  componentClass?: string;
  // checkbox is indeterminante or not
  indeterminante?: boolean;
  // Additional text to aide in use
  helpText?: React.ReactNode;
  // ID for form input
  componentId?: string;
  // Name for form input
  name?: string;
  // Value for form input
  value?: string;
  // Display an error state
  error?: Error;
  errors?: [string];
  // Disabled checkbox name
  disabled?: boolean;
  // Theme to be injected via css-themr
  theme?: any;
  // Callback when checkbox is toggled
  onChange?(newValue: boolean): void;
  // Callback when checkbox is focussed
  onFocus?(): void;
  // Callback when focus is removed
  onBlur?(): void;
  // Function return all errors
  getErrors?(errors:any, name?:string): void;
}

export interface State {
  checked: boolean;
}
const getUniqueID = createUniqueIDFactory('Checkbox');

class Checkbox extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      checked: props.checked || false,
    };
  }

  componentWillReceiveProps(newProps: Props) {
    if (newProps.checked !== undefined) {
      this.setState({ checked: newProps.checked });
    }
    if (JSON.stringify(this.props.errors) !== JSON.stringify(newProps.errors)) {
      const { getErrors } = this.props;
      getErrors && getErrors(newProps.errors, newProps.name);
    }
  }

  handleChange = () => {
    const { disabled, onChange } = this.props;

    if (!disabled) {
      this.setState({ checked: !this.state.checked });

      if (onChange) {
        onChange(!this.state.checked);
      }
    }
  }

  render() {
    const { checked } = this.state;
    const {
      componentClass = '',
      componentId = getUniqueID(),
      disabled = false,
      helpText,
      indeterminante,
      label = '',
      name = getUniqueID(),
      theme,
      errors,
    } = this.props;

    const describedBy: string[] = [];
    if (helpText) {
      describedBy.push(helpTextID(componentId));
    }

    const checkboxClass = classNames(
      theme.checkboxCommon,
      disabled && theme.checkboxDisabled,
      !indeterminante && theme.customControlInput,
      indeterminante && theme.customControlInputIndeterminante
    );

    const errorMarkup = errors
    ? (
      <Message componentId={`${componentId}Error`} isVisible={true}>
        {errors instanceof Array ? errors.join(', ') : (typeof errors === 'string' ? errors : 'An error occurred.')}
      </Message>
    )
    : null;

    return (
      <FlexBox componentClass={componentClass} direction ={helpText ? 'Column' : 'Row'} >
        {errorMarkup}
        <div className={theme.customControl} onClick={this.handleChange}>
          <input
            type="checkbox"
            className={checkboxClass}
            id={componentId}
            checked={checked}
            disabled={disabled}
            name={name}
            onChange={() => {}}
            aria-describedby={describedBy.length ? describedBy.join(' ') : undefined}
            aria-checked={checked}
          />
          <label className={theme.customControlLabel} style={{ padding: !label ? 0 : 'initial' }} htmlFor={componentId}>{label}</label>
        </div>
        {
          helpText ? <div>{helpText}</div> : null
        }
      </FlexBox>
    );
  }
}

export default themr(CHECKBOX, baseTheme)(Checkbox) as ThemedComponentClass<Props, {}>;

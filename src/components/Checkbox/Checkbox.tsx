import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';

import Choice, { Error, helpTextID } from '../Choice';
import Icon from '../Icon';
import { CHECKBOX } from '../ThemeIdentifiers';
import Message from '../Message';

import { minusMinor, tickSmallMinor } from '../../icons';
import * as baseTheme from './Checkbox.scss';

export interface Props {
  // Checkbox is selected or not
  checked?: boolean | 'indeterminate';
  // ID for form input
  componentId?: string;
  // Disabled checkbox name
  disabled?: boolean;
  // Display an error state
  error?: Error;
  errors?: [string];
  // Additional text to aide in use
  helpText?: React.ReactNode;
  // Label for the checkbox
  label: string;
  // Visually hide the label
  labelHidden?: boolean;
  // Name for form input
  name?: string;
  // Callback when focus is removed
  onBlur?(): void;
  // Callback when checkbox is toggled
  onChange?(newValue: boolean): void;
  // Callback when checkbox is focussed
  onFocus?(): void;
  // Theme to be injected via css-themr
  theme?: any;
  // Value for form input
  value?: string;
  // Function return all errors
  getErrors?(errors:any, name?:string): void;
}

export interface State {
  checked: boolean | 'indeterminate';
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

  handleChange = (event: any) => {
    event.preventDefault();
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
      // checked = false,
      componentId = getUniqueID(),
      disabled = false,
      errors,
      helpText,
      label,
      labelHidden = false,
      name,
      onFocus,
      onBlur,
      theme,
      value,
    } = this.props;

    const describedBy: string[] = [];
    if (helpText) {
      describedBy.push(helpTextID(componentId));
    }

    const errorMarkup = errors
    ? (
      <Message componentId={`${componentId}Error`} isVisible={true} theme={theme}>
        {errors instanceof Array ? errors.join(', ') : (typeof errors === 'string' ? errors : 'An error occurred.')}
      </Message>
    )
    : null;

    const ariaDescribedBy = describedBy.length
        ? describedBy.join(' ')
        : undefined;

    const isIndeterminate = checked === 'indeterminate';
    const isChecked = !isIndeterminate && Boolean(checked);

    const indeterminateAttributes = isIndeterminate
      ? { indeterminate: 'true', 'aria-checked': 'mixed' as 'mixed' }
      : { 'aria-checked': isChecked };

    const iconSource = isIndeterminate ? minusMinor : tickSmallMinor;

    const wrapperClassName = classNames(
      theme.checkbox
      // error && theme.error
    );

    const inputClassName = classNames(
      theme.input,
      isIndeterminate && theme.indeterminate
    );

    return (
      <div>
        {errorMarkup}
        <Choice
          componentId={componentId}
          label={label}
          labelHidden={labelHidden}
          helpText={helpText}
          disabled={disabled}
          theme={theme}
        >
          <span className={wrapperClassName} onClick={this.handleChange}>
            <input
              id={componentId}
              name={name}
              value={value}
              type="checkbox"
              checked={isChecked}
              disabled={disabled}
              className={inputClassName}
              onChange={noop}
              onFocus={onFocus}
              onBlur={onBlur}
              aria-invalid={errors != null}
              aria-describedby={ariaDescribedBy}
              role="checkbox"
              {...indeterminateAttributes}
            />

            <span className={theme.backdrop} />
            <span className={theme.icon}>
              <Icon source={iconSource} />
            </span>
          </span>
        </Choice>
      </div>
    );
  }
}

function noop() {}

export { Checkbox as UnthemedCheckbox };
export default themr(CHECKBOX, baseTheme)(Checkbox) as ThemedComponentClass<Props, {}>;

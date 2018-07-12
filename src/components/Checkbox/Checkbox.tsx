import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';

import Choice, { Error, errorID, helpTextID } from '../Choice';
import Icon from '../Icon';
import { CHECKBOX } from '../ThemeIdentifiers';

import checkmarkSvg from './icons/checkmark.svg';
import * as baseTheme from './Checkbox.scss';

export interface Props {
  // Label for the checkbox
  label: string;
  // Visually hide the label
  labelHidden?: boolean;
  // Checkbox is selected or not
  checked?: boolean;
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
}

const getUniqueID = createUniqueIDFactory('Checkbox');

const checkbox = ({
  componentId = getUniqueID(),
  label,
  labelHidden,
  helpText,
  checked,
  error,
  disabled,
  onChange,
  onFocus,
  onBlur,
  name,
  value,
  theme,
}: Props) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (onChange == null) { return; }
    const { currentTarget } = event;
    onChange(currentTarget.checked);
  }

  const describedBy: string[] = [];
  if (typeof error === 'string') { describedBy.push(errorID(componentId)); }
  if (helpText) { describedBy.push(helpTextID(componentId)); }

  const className = classNames(
    theme.checkbox,
    error && theme.error
  );

  return (
    <Choice
      componentId={componentId}
      label={label}
      labelHidden={labelHidden}
      helpText={helpText}
      error={error}
    >
      <div className={className}>
        <input
          id={componentId}
          name={name}
          value={value}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          className={theme.input}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-invalid={error != null}
          aria-describedby={describedBy.length ? describedBy.join(' ') : undefined}
          aria-checked={checked}
        />

        <div className={theme.backdrop} />
        <div className={theme.icon}>
          <Icon source={checkmarkSvg} />
        </div>
      </div>
    </Choice>
  );
};

export { checkbox as UnthemedCheckbox };
export default themr(CHECKBOX, baseTheme)(checkbox) as ThemedComponentClass<Props, {}>;

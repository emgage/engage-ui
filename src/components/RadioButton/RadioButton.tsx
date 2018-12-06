import * as React from 'react';
import { themr } from '@friendsofreactjs/react-css-themr';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';

import Choice, { helpTextID } from '../Choice';
import { RADIO_BUTTON } from '../ThemeIdentifiers';

import * as baseTheme from './RadioButton.scss';

export interface Props {
  // Label for the radio button.
  label: string;
  // Visually hide the label.
  labelHidden?: boolean;
  // Additional text to aid in use.
  helpText?: React.ReactNode;
  // Radio button is selected.
  checked?: boolean;
  // ID for form input.
  componentId?: string;
  // Name for form input.
  name?: string;
  // Value for form input.
  value?: string;
  // Set as disabled or not.
  disabled?: boolean;
  // Theme to be injected via css-themr.
  theme?: any;
  // Callback when the radio button is toggled.
  onChange?(newValue: boolean): void;
  // Callback when radio button is focussed.
  onFocus?(): void;
  // Callback when focus is removed.
  onBlur?(): void;
}

const getUniqueID = createUniqueIDFactory('RadioButton');

const radioButton = ({
  label,
  labelHidden,
  helpText,
  checked,
  disabled,
  onChange,
  onFocus,
  onBlur,
  componentId= getUniqueID(),
  name = componentId,
  value,
  theme,
}: Props) => {
  function handleChange({ currentTarget }: React.ChangeEvent<HTMLInputElement>) {
    if (onChange == null) { return; }
    onChange(currentTarget.checked);
  }

  const describedBy = helpText
    ? helpTextID(componentId)
    : null;

  const input = describedBy === null ?
    (
      <input
        id={componentId}
        name={name}
        value={value}
        type="radio"
        checked={checked}
        disabled={disabled}
        className={theme.input}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    ) : (
      <input
        id={componentId}
        name={name}
        value={value}
        type="radio"
        checked={checked}
        disabled={disabled}
        className={theme.input}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-describedby={describedBy}
      />
    );

  return (
    <Choice label={label} labelHidden={labelHidden} componentId={componentId} helpText={helpText}>
      <div className={theme.radioButton}>
        {input}
        <div className={theme.backdrop} />
        <div className={theme.icon} />
      </div>
    </Choice>
  );
};

export default themr(RADIO_BUTTON, baseTheme)(radioButton);

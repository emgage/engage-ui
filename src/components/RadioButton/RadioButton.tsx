import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
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
  customId?: string;
  // Name for form input.
  customName?: string;
  // Value for form input.
  customValue?: string;
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
  customId= getUniqueID(),
  customName = customId,
  customValue,
  theme,
}: Props) => {
  function handleChange({ currentTarget }: React.ChangeEvent<HTMLInputElement>) {
    if (onChange == null) { return; }
    onChange(currentTarget.checked);
  }

  const describedBy = helpText
    ? helpTextID(customId)
    : null;

  const input = describedBy === null ?
    (
      <input
        id={customId}
        name={customName}
        value={customValue}
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
        id={customId}
        name={customName}
        value={customValue}
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
    <Choice label={label} labelHidden={labelHidden} customId={customId} helpText={helpText}>
      <div className={theme.radioButton}>
        {input}
        <div className={theme.backdrop} />
        <div className={theme.icon} />
      </div>
    </Choice>
  );
};

export default themr(RADIO_BUTTON, baseTheme)(radioButton) as ThemedComponentClass<Props, {}>;

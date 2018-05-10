import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';

import Labelled, { Action, Error, errorID } from '../Labelled';
import Choice, { helpTextIDChoice } from '../Choice';
import { RADIO_BUTTON } from '../ThemeIdentifiers';

import * as baseTheme from './RadioButton.scss';

export interface Props {
  label: string;
  labelHidden?: boolean;
  labelAction?: Action;
  helpText?: React.ReactNode;
  checked?: boolean;
  id?: string;
  name?: string;
  value?: string;
  errors?: [string] | Error;
  disabled?: boolean;
  theme?: any;
  required?: boolean;
  onChange?(newValue: boolean): void;
  onFocus?(): void;
  onBlur?(): void;
}

const getUniqueID = createUniqueIDFactory('RadioButton');

const radioButton = ({
  label,
  labelHidden,
  labelAction,
  helpText,
  checked,
  errors,
  disabled,
  required,
  onChange,
  onFocus,
  onBlur,
  id = getUniqueID(),
  name = id,
  value,
  theme,
}: Props) => {
  function handleChange({ currentTarget }: React.ChangeEvent<HTMLInputElement>) {
    if (onChange == null) { return; }
    onChange(currentTarget.checked);
  }

  const describedBy : string[] = [];
  if (helpText) { describedBy.push(helpTextIDChoice(id)); }
  if (errors) { describedBy.push(errorID(id)); }

  const input = describedBy === null ?
    (
      <input
        id={id}
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
        id={id}
        name={name}
        value={value}
        type="radio"
        checked={checked}
        disabled={disabled}
        className={theme.input}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-describedby={describedBy.length ? describedBy.join(' ') : undefined}
      />
    );

  return (
    <Labelled
      id={id}
      label={''}
      errors={errors}
      action={labelAction}
      labelHidden={labelHidden}
      helpText={helpText}
      required={required}
    >
    <Choice label={label} labelHidden={labelHidden} id={id} helpText={helpText}>
      <div className={theme.radioButton}>
        {input}
        <div className={theme.backdrop} />
        <div className={theme.icon} />
      </div>
    </Choice>
    </Labelled>
  );
};

export default themr(RADIO_BUTTON, baseTheme)(radioButton) as ThemedComponentClass<Props, {}>;

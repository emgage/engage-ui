import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';

import Labelled, { Action, Error } from '../Labelled';
import Choice, { ErrorChoice, errorIDChoice, helpTextIDChoice } from '../Choice';
import Icon from '../Icon';
import { CHECKBOX } from '../ThemeIdentifiers';

import checkmarkSvg from './icons/checkmark.svg';
import * as baseTheme from './Checkbox.scss';

export interface Props {
  label: string;
  labelHidden?: boolean;
  labelAction?: Action;
  checked?: boolean;
  helpText?: React.ReactNode;
  id?: string;
  name?: string;
  value?: string;
  error?: ErrorChoice;
  errors?: [string] | Error;
  disabled?: boolean;
  theme?: any;
  required?: boolean;
  onChange?(newValue: boolean): void;
  onFocus?(): void;
  onBlur?(): void;
}

const getUniqueID = createUniqueIDFactory('Checkbox');

const checkbox = ({
  id = getUniqueID(),
  label,
  labelHidden,
  labelAction,
  helpText,
  checked,
  error,
  errors,
  disabled,
  required,
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
  if (typeof error === 'string') { describedBy.push(errorIDChoice(id)); }
  if (helpText) { describedBy.push(helpTextIDChoice(id)); }

  const className = classNames(
    theme.checkbox,
    error && theme.error
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
    <Choice
      id={id}
      label={label}
      labelHidden={labelHidden}
      helpText={helpText}
      error={error}
    >
      <div className={className}>
        <input
          id={id}
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
    </Labelled>
  );
};

export { checkbox as UnthemedCheckbox };
export default themr(CHECKBOX, baseTheme)(checkbox) as ThemedComponentClass<Props, {}>;

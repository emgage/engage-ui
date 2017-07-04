import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';

import Choice, { Error, errorID, helpTextID } from '../Choice';
import Icon from '../Icon';
import { CHECKBOX } from '../ThemeIdentifiers';

import checkmark from './icons/checkmark.svg';
import * as baseTheme from './Checkbox.scss';

export interface Props {
  label: string,
  labelHidden?: boolean,
  checked?: boolean,
  helpText?: React.ReactNode,
  id?: string,
  name?: string,
  value?: string,
  error?: Error,
  disabled?: boolean,
  theme?: any,
  onChange?(newValue: boolean): void,
  onFocus?(): void,
  onBlur?(): void,
}

const getUniqueID = createUniqueIDFactory('Checkbox');

const Checkbox = ({
  id = getUniqueID(),
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
    const {currentTarget} = event;
    onChange(currentTarget.checked);
  }

  const describedBy: string[] = [];
  if (typeof error === 'string') { describedBy.push(errorID(id)); }
  if (helpText) { describedBy.push(helpTextID(id)); }

  const className = classNames(
    theme.Checkbox,
    error && theme.error,
  );

  return (
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
          className={theme.Input}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-invalid={error != null}
          aria-describedby={describedBy.length ? describedBy.join(' ') : undefined}
        />

        <div className={theme.Backdrop} />
        <div className={theme.Icon}>
          <Icon source={checkmark} />
        </div>
      </div>
    </Choice>
  );
}

export default themr(CHECKBOX, baseTheme)(Checkbox) as ThemedComponentClass<Props, {}>;

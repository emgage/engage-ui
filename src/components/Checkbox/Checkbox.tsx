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
  label: string;
  labelHidden?: boolean;
  checked?: boolean;
  helpText?: React.ReactNode;
  id?: string;
  name?: string;
  value?: string;
  error?: Error;
  disabled?: boolean;
  theme?: any;
  onChange?(newValue: boolean): void;
  onFocus?(): void;
  onBlur?(): void;
}

const getUniqueID = createUniqueIDFactory('Checkbox');

const checkbox = ({
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
    const { currentTarget } = event;
    onChange(currentTarget.checked);
  }

  const describedBy: string[] = [];
  if (typeof error === 'string') { describedBy.push(errorID(id)); }
  if (helpText) { describedBy.push(helpTextID(id)); }

  const className = classNames(
    theme.checkbox,
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
          className={theme.input}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-invalid={error != null}
          aria-describedby={describedBy.length ? describedBy.join(' ') : undefined}
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

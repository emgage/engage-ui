import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';

import Choice, {helpTextID} from '../Choice';
import { RADIO_BUTTON } from '../ThemeIdentifiers';

import * as baseTheme from './RadioButton.scss';

export interface Props {
  label: string,
  labelHidden?: boolean,
  helpText?: React.ReactNode,
  checked?: boolean,
  id?: string,
  name?: string,
  value?: string,
  disabled?: boolean,
  theme?: any,
  onChange?(newValue: boolean): void,
  onFocus?(): void,
  onBlur?(): void,
}

const getUniqueID = createUniqueIDFactory('RadioButton');

const RadioButton = ({
  label,
  labelHidden,
  helpText,
  checked,
  disabled,
  onChange,
  onFocus,
  onBlur,
  id = getUniqueID(),
  name = id,
  value,
  theme,
}: Props) => {
  function handleChange({currentTarget}: React.ChangeEvent<HTMLInputElement>) {
    if (onChange == null) { return; }
    onChange(currentTarget.checked);
  }

  const describedBy = helpText
    ? helpTextID(id)
    : null;

  return (
    <Choice label={label} labelHidden={labelHidden} id={id} helpText={helpText}>
      <div className={theme.RadioButton}>
        <input
          id={id}
          name={name}
          value={value}
          type="radio"
          checked={checked}
          disabled={disabled}
          className={theme.Input}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-describedby={describedBy}
        />
        <div className={theme.Backdrop} />
        <div className={theme.Icon} />
      </div>
    </Choice>
  );
}

export default themr(RADIO_BUTTON, baseTheme)(RadioButton) as ThemedComponentClass<Props, {}>;

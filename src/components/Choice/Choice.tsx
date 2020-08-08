import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import Icon from '../Icon';
import { CHOICE } from '../ThemeIdentifiers';

import * as baseTheme from './Choice.scss';

export type Error = boolean | string;

export interface Props {
  // Set id of Choice component.
  componentId: string;
  // Set label text.
  label: string;
  // Whether the associated form control is disabled
  disabled?: Boolean;
  // To give error as boolean or string.
  error?: Error;
  // Display label or not.
  labelHidden?: boolean;
  // To provide child text.
  children?: React.ReactNode;
  // Text to understand in detail.
  helpText?: React.ReactNode;
  // Theme to be injected via css-themr.
  theme?: any;
}

const choice = ({
  componentId,
  label,
  disabled = false,
  error,
  children,
  labelHidden = false,
  helpText,
  theme,
}: Props) => {
  const className = classNames(
    theme.choice,
    labelHidden && theme.labelHidden,
    disabled && theme.disabled
  );
  const labelMarkup = (
    <label className={className} htmlFor={componentId}>
      <span className={theme.control}>{children}</span>
      <span className={theme.label}>{label}</span>
    </label>
  );

  const helpTextMarkup = helpText
    ? <div className={theme.helpText} id={helpTextID(componentId)}>{helpText}</div>
    : null;

  const errorMarkup = typeof error === 'string'
    ? (
      <div className={theme.error} id={errorID(componentId)}>
        <div className={theme.errorIcon}><Icon source="alert" /></div>
        {error}
      </div>
    )
    : null;

  const descriptionMarkup = helpTextMarkup || errorMarkup
    ? (
      <div className={theme.descriptions}>
        {errorMarkup}
        {helpTextMarkup}
      </div>
    )
    : null;

  return descriptionMarkup
    ? (
      <div>
        {labelMarkup}
        {descriptionMarkup}
      </div>
    )
    : labelMarkup;
};

export function helpTextID(id: string) {
  return `${id}HelpText`;
}

export function errorID(id: string) {
  return `${id}Error`;
}

export default themr(CHOICE, baseTheme)(choice) as ThemedComponentClass<Props, {}>;

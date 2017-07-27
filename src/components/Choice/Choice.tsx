import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import Icon from '../Icon';
import { CHOICE } from '../ThemeIdentifiers';

import * as baseTheme from './Choice.scss';

export type Error = boolean | string;

export interface Props {
  id: string;
  label: string;
  error?: Error;
  labelHidden?: boolean;
  children?: React.ReactNode;
  helpText?: React.ReactNode;
  theme?: any;
}

const choice = ({
  id,
  label,
  error,
  children,
  labelHidden,
  helpText,
  theme,
}: Props) => {
  const className = classNames(theme.choice, labelHidden && theme.labelHidden);
  const labelMarkup = (
    <label className={className} htmlFor={id}>
      <div className={theme.control}>{children}</div>
      <div className={theme.label}>{label}</div>
    </label>
  );

  const helpTextMarkup = helpText
    ? <div className={theme.helpText} id={helpTextID(id)}>{helpText}</div>
    : null;

  const errorMarkup = typeof error === 'string'
    ? (
      <div className={theme.error} id={errorID(id)}>
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

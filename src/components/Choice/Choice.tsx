import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import Icon from '../Icon';
import { CHOICE } from '../ThemeIdentifiers';

import * as baseTheme from './Choice.scss';

export type ErrorChoice = boolean | string;

export interface Props {
  id: string;
  label: string;
  error?: ErrorChoice;
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
    ? <div className={theme.helpText} id={helpTextIDChoice(id)}>{helpText}</div>
    : null;

  const errorMarkup = typeof error === 'string'
    ? (
      <div className={theme.error} id={errorIDChoice(id)}>
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

export function helpTextIDChoice(id: string) {
  return `${id}HelpText`;
}

export function errorIDChoice(id: string) {
  return `${id}Error`;
}

export default themr(CHOICE, baseTheme)(choice) as ThemedComponentClass<Props, {}>;

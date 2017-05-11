import * as React from 'react';
import { themr } from 'react-css-themr';
import {classNames} from '@shopify/react-utilities/styles';

import Label, {Props as LabelProps, Action, labelID} from '../Label';
import Message from '../Message';
import { LABELLED } from '../ThemeIdentifiers';
import * as baseTheme from './Labelled.scss';

export {Action, labelID};

export type Error = boolean | string;

export interface Props {
  id: LabelProps['id'],
  label: string,
  errors?: [string],
  action: LabelProps['action'],
  helpText?: React.ReactNode,
  children?: React.ReactNode,
  labelHidden?: boolean,
  required?: boolean,
  focused?: boolean,
  hasValue?: boolean,
  theme?: any,
}

const Labelled = ({
  id,
  label,
  errors,
  children,
  labelHidden,
  helpText,
  required,
  focused,
  hasValue,
  theme,
  ...rest,
}: Props) => {
  const wrapperClassName = classNames(
    labelHidden && theme.hidden,
  );

  const labelWrapperClassName = classNames(
    theme.LabelWrapper,
    required && theme.required,
    focused && theme.focused,
    (errors && errors.length > 0) && theme.invalid,
    !hasValue && theme.empty,
  );

  const helpTextMarkup = helpText
    ? <div className={theme.HelpText} id={helpTextID(id)}>{helpText}</div>
    : null;

  const errorId = errorID(id);
  const errorMarkup = errors
    ? (
      <Message id={errorId} isVisible={true}>
        {errors.join(', ')}
      </Message>
    )
    : null;

  const labelMarkup = label
    ? (
      <div className={labelWrapperClassName}>
        <Label id={id} {...rest} hidden={false}>{label}</Label>
      </div>
    )
    : null;

  return (
    <div className={wrapperClassName} aria-describedby={errorId}>
      {errorMarkup}
      {labelMarkup}
      {children}
      {helpTextMarkup}
    </div>
  );
}

export function errorID(id: string) {
  return `${id}Error`;
}

export function helpTextID(id: string) {
  return `${id}HelpText`;
}

export default themr(LABELLED, baseTheme)(Labelled);

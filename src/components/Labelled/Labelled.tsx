import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import Label, {Props as LabelProps, Action, labelID} from '../Label';
import Message from '../Message';

import * as styles from './Labelled.scss';

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
}

export default function Labelled({
  id,
  label,
  errors,
  children,
  labelHidden,
  helpText,
  ...rest,
}: Props) {
  const className = classNames(
    labelHidden && styles.hidden,
  );

  const helpTextMarkup = helpText
    ? <div className={styles.HelpText} id={helpTextID(id)}>{helpText}</div>
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
      <div className={styles.LabelWrapper}>
        <Label id={id} {...rest} hidden={false}>{label}</Label>
      </div>
    )
    : null;

  return (
    <div className={className} aria-describedby={errorId}>
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

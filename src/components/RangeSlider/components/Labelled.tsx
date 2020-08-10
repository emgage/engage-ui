import *as React from 'react';
import { buttonFrom } from '../../Button';
import Label, { labelID } from '../../Label';
import { InlineError } from './InlineError';

export { labelID };

type Falsy = boolean | undefined | null | 0;

export function classNames(...classes: (string | Falsy)[]) {
  return classes.filter(Boolean).join(' ');
}

export function variationName(name: string, value: string) {
  return `${name}${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

export interface LabelProps {
  children?: string;
  id: string;
  hidden?: boolean;
}

export interface LabelledProps {
  id: LabelProps['id'];
  label: string;
  error?: any;
  action?: any;
  helpText?: React.ReactNode;
  children?: React.ReactNode;
  /** Visually hide the label */
  labelHidden?: boolean;
}

// tslint:disable-next-line: function-name
export function Labelled({
  id,
  label,
  error,
  action,
  helpText,
  children,
  labelHidden,
  ...rest
}: LabelledProps) {
  const className = classNames(labelHidden);

  const actionMarkup = action ? (
    <div >{buttonFrom(action, { plain: true })}</div>
  ) : null;

  const helpTextMarkup = helpText ? (
    <div  id={helpTextID(id)}>
      {helpText}
    </div>
  ) : null;

  const errorMarkup = error && typeof error !== 'boolean' && (
    <div >
      <InlineError message={error} fieldID={id} />
    </div>
  );

  const labelMarkup = label ? (
    <div>
      <Label componentId={id} {...rest} hidden={false}>
        {label}
      </Label>

      {actionMarkup}
    </div>
  ) : null;

  return (
    <div className={className}>
      {labelMarkup}
      {children}
      {errorMarkup}
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

import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import Label, { Props as LabelProps, Action, labelID } from '../Label';
import Message from '../Message';
import { LABELLED } from '../ThemeIdentifiers';

import * as baseTheme from './Labelled.scss';

export { Action, labelID };

export type Error = string;

export interface Props {
  // ID for the input.
  customId: LabelProps['customId'];
  // Label for labelled component
  label: string;
  // To display error message.
  errors?: [string] | Error;
  // Adds an action to the label.
  action: LabelProps['action'];
  helpText?: React.ReactNode;
  // The content to display inside labelled.
  children?: React.ReactNode;
  // Visually hide the labelled.
  labelHidden?: boolean;
  // To make it required or not.
  required?: boolean;
  // To display labelled focused.
  focused?: boolean;
  // To display Initial value for the labelled.
  hasValue?: boolean;
  // To provide styling for labelled.
  customStyle?: React.CSSProperties;
  // Theme to be injected via css-themr.
  theme?: any;
}

const labelled = ({
  customId,
  label,
  errors,
  children,
  labelHidden,
  helpText,
  required,
  focused,
  hasValue,
  customStyle,
  theme,
  ...rest
}: Props) => {
  const wrapperClassName = classNames(
    labelHidden && theme.hidden
  );
  const labelWrapperClassName = classNames(
    theme.labelWrapper,
    required && theme.required,
    focused && theme.focused,
    (errors && errors) && theme.invalid,
    !hasValue && theme.empty
  );

  const helpTextMarkup = helpText
    ? <div className={theme.helpText} id={helpTextID(customId)}>{helpText}</div>
    : null;

  const errorId = errorID(customId);
  const errorMarkup = errors
    ? (
      <Message customId={errorId} isVisible={true}>
        {errors instanceof Array ? errors.join(', ') : (typeof errors === 'string' ? errors : 'An error occurred.')}
      </Message>
    )
    : null;

  const labelMarkup = label
    ? (
      <div className={labelWrapperClassName} id={'labelMarkup'}>
        <Label
          customId={customId}
          hidden={false}
          focused={focused}
          hasValue={hasValue}
          required={required}
          {...rest}
        >
          {label}
        </Label>
      </div>
    )
    : null;

  return (
    <div className={wrapperClassName} aria-describedby={errorId} id={'labelled.tsx'} style={customStyle}>
      {errorMarkup}
      {labelMarkup}
      {children}
      {helpTextMarkup}
    </div>
  );
};

export function errorID(id: string) {
  return `${id}Error`;
}

export function helpTextID(id: string) {
  return `${id}HelpText`;
}

export default themr(LABELLED, baseTheme)(labelled) as ThemedComponentClass<Props, {}>;

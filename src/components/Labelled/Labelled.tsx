import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import Label, { Props as LabelProps, Action, labelID } from '../Label';
import Message from '../Message';
import { LABELLED } from '../ThemeIdentifiers';

import * as baseTheme from './Labelled.scss';

export { Action, labelID };

export type Error = string;

export interface Props {
  autoSuggest?: boolean;
  // ID for the input.
  componentId: LabelProps['componentId'];
  // Label for labelled component
  label: string;
  // To display error message.
  errors?: [string] | Error;
  // Adds an action to the label.
  action: LabelProps['action'];
  helpText?: React.ReactNode;
  disabled?: boolean;
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
  componentStyle?: React.CSSProperties;
  // Add external class
  componentClass?: string;
  // Theme to be injected via css-themr.
  theme?: any;
}

const labelled = ({
  componentId,
  label,
  errors,
  children,
  labelHidden = false,
  helpText,
  disabled = false,
  required = false,
  focused = false,
  hasValue = false,
  componentStyle,
  componentClass,
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

  const helpTextClassName = classNames(
    theme.helpText,
    disabled && theme.disabled
  );

  const helpTextMarkup = helpText
    ? <div className={helpTextClassName} id={helpTextID(componentId)}>{helpText}</div>
    : null;

  const errorId = errorID(componentId);
  const errorMarkup = errors
    ? (
      <Message componentId={errorId} isVisible={true} theme={theme}>
        {errors instanceof Array ? errors.join(', ') : (typeof errors === 'string' ? errors : 'An error occurred.')}
      </Message>
    )
    : null;

  const labelMarkup = label
    ? (
      <div className={labelWrapperClassName}>
        <Label
          componentId={componentId}
          hidden={false}
          hasValue={hasValue}
          focused={focused}
          required={required}
          componentClass={componentClass}
          {...rest}
          theme={theme}
        >
          {label}
        </Label>
      </div>
    )
    : null;

  return (
    <div className={wrapperClassName} aria-describedby={errorId} style={componentStyle}>
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

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
  id: LabelProps['id'];
  label: string;
  errors?: [string] | Error;
  action: LabelProps['action'];
  helpText?: React.ReactNode;
  children?: React.ReactNode;
  labelHidden?: boolean;
  required?: boolean;
  focused?: boolean;
  hasValue?: boolean;
  style?: React.CSSProperties;
  theme?: any;
}

const labelled = ({
  id,
  label,
  errors,
  children,
  labelHidden,
  helpText,
  required,
  focused,
  hasValue,
  style,
  theme,
  ...rest,
}: Props) => {
  const wrapperClassName = classNames(
    labelHidden && theme.hidden,
  );

  const labelWrapperClassName = classNames(
    theme.labelWrapper,
    required && theme.required,
    focused && theme.focused,
    (errors && errors) && theme.invalid,
    !hasValue && theme.empty,
  );

  const helpTextMarkup = helpText
    ? <div className={theme.helpText} id={helpTextID(id)}>{helpText}</div>
    : null;

  const errorId = errorID(id);
  const errorMarkup = errors
    ? (
      <Message id={errorId} isVisible={true}>
        {errors instanceof Array ? errors.join(', ') : (typeof errors === 'string' ? errors : 'An error occurred.')}
      </Message>
    )
    : null;

  const labelMarkup = label
    ? (
      <div className={labelWrapperClassName}>
        <Label
          id={id}
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
    <div className={wrapperClassName} aria-describedby={errorId} style={style}>
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

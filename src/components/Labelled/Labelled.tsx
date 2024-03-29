import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import Label, { Props as LabelProps, Action, labelID } from '../Label';
// import Message from '../Message';
import { LABELLED } from '../ThemeIdentifiers';

import * as baseTheme from './Labelled.scss';
import Icon from '../Icon/Icon'
import FlexBox from '../FlexBox/FlexBox';

export { Action, labelID };

export type Error = string;

export type Type = 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url' | 'date' | 'datetime-local' | 'month' | 'time' | 'week';

export interface Props {
  autoSuggest?: boolean;
  // ID for the input.
  componentId: LabelProps['componentId'];
  // Label for labelled component
  label: string;
  // To display error message.
  errors?: [string] | Error| null;
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
  labelComponentStyle?: React.CSSProperties;
  // Add external class
  componentClass?: string;
  // Theme to be injected via css-themr.
  theme?: any;
  onClick?: (event: React.FormEvent<any>) => void;
  readOnly?:boolean;
  markIfRequired?: boolean,
  onHover?: boolean,
  fullWidth?: boolean,
  type?: Type
}

const labelled = ({
  onHover,
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
  readOnly = false,
  componentStyle,
  componentClass,
  labelComponentStyle,
  theme,
  markIfRequired,
  fullWidth,
  type,
  onClick = (_:any) => { },
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
    !hasValue && theme.empty,
    readOnly && theme.readOnly,
    fullWidth && theme.fullWidth
  );

  const helpTextClassName = classNames(
    theme.helpText,
    disabled && theme.disabled
  );

  const tooltipClassName = classNames(
    theme.tooltip,
    type === 'number' && theme.tooltipPosition
  );

  const helpTextMarkup = helpText
    ? <div className={helpTextClassName} id={helpTextID(componentId)}>{helpText}</div>
    : null;

  // const errorId = errorID(componentId);
  // const errorMarkup = errors
  //   ? (
  //     <Message componentId={errorId} isVisible={true} theme={theme}>
  //       {errors instanceof Array ? errors.join(', ') : (typeof errors === 'string' ? errors : 'An error occurred.')}
  //     </Message>
  //   )
  //   : null;

  const errorMarkup = errors
    ? (<div className={theme.mainContainer}><div className={tooltipClassName}>
     {errors instanceof Array ? errors.join(', ') : (typeof errors === 'string' ? errors : 'An error occurred.')}
      <div className={theme.tip}></div>
    </div></div>)
    : null;

  const labelMarkup = label
    ? (
      <div className={labelWrapperClassName} onClick={onClick}>
        <Label
          componentId={componentId}
          hidden={false}
          hasValue={hasValue}
          focused={focused}
          required={required}
          componentClass={componentClass}
          componentStyle={labelComponentStyle}
          {...rest}
          theme={theme}
        >
          <FlexBox>
            {label}
            {markIfRequired && <span className={theme.markWrapper}><Icon componentClass={theme.mark} source="requiredMark"></Icon></span>}
          </FlexBox>
        </Label>
      </div>
    )
    : null;

  let htmlID: string = labelID(componentId);
  if (errors) { htmlID += ' ' + errorID(componentId); }
  if (helpText) { htmlID += ' ' + helpTextID(componentId); }

  return (
    <div className={wrapperClassName} id={htmlID} style={{...componentStyle, position:'relative'}}>
      {onHover && errorMarkup}
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

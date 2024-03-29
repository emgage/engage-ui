import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import { CHOICE } from '../ThemeIdentifiers';

import * as baseTheme from './Choice.scss';

import { FlexBox,Icon } from '../../../src/components/';

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
  markIfRequired?:boolean;
  errors?: any
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
  markIfRequired,
  errors
}: Props) => {
  const className = classNames(
    theme.choice,
    labelHidden && theme.labelHidden,
    disabled && theme.disabled
  );
const [onHover, SetOnHover] = React.useState(false)

  const labelMarkup = (
    <label style={{width:'100%'}} className={className} htmlFor={componentId}>
      <span className={theme.control}>{children}</span>
      <div style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
        <FlexBox>
          <span className={theme.label}>{label}</span>
          {markIfRequired && <span className={theme.markWrapper}><Icon componentClass={theme.mark} source="requiredMark"></Icon></span>}
        </FlexBox>
       {onHover && 
        <div className={theme.tooltip}>
          {errors instanceof Array ? errors.join(', ') : (typeof errors === 'string' ? errors : 'An error occurred.')}
          <div className={theme.tip}></div>
        </div>
        }
        {errors && 
        <div onMouseEnter={() => SetOnHover(true)} onMouseLeave={() => SetOnHover(false)}>
           <Icon componentClass={theme.errorIconStyle} source='errorIcon'></Icon>
           </div>
        }
      </div>
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

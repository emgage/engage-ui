import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import { Action } from '../../types';
import { buttonFrom } from '../Button';
import { LABEL } from '../ThemeIdentifiers';

import * as baseTheme from './Label.scss';

export { Action };

export interface Props {
  children?: any;
  // ID for the input.
  componentId: string;
  // Adds an action to the label.
  action?: Action;
  // Visually hide the label.
  hidden?: boolean;
  // To provide styling for label.
  componentStyle?: React.CSSProperties;
  // Extra class passed as a prop
  componentClass?: string;
  // Theme to be injected via css-themr.
  theme?: any;
  // To make it required or not.
  required?: boolean;
  // To display label focused.
  focused?: boolean;
  // To display Initial value for the label.
  hasValue?: boolean;
}

export function labelID(id: string) {
  return `${id}Label`;
}

function label({
  children,
  componentId,
  action,
  hidden = false,
  required = false,
  hasValue = false,
  focused = false,
  componentStyle,
  componentClass = '',
  theme,
}: Props) {
  const className = classNames(
    theme.text,
    componentClass,
    hidden && theme.hidden,
    required && theme.required,
    !hasValue && theme.empty,
    focused && theme.focused
  );

  const actionMarkup = action
    ? buttonFrom(action, { plain: true })
    : null;

  return (
    <div className={theme.label}>
      <label id={labelID(componentId)} htmlFor={componentId} className={className} style={componentStyle}>{children}</label>
      {actionMarkup}
    </div>
  );
}

export default themr(LABEL, baseTheme)(label) as ThemedComponentClass<Props, {}>;

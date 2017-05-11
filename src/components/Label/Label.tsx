import * as React from 'react';
import { themr } from 'react-css-themr';
import {classNames} from '@shopify/react-utilities/styles';

import {Action} from '../../types';
import {buttonFrom} from '../Button';
import { LABEL } from '../ThemeIdentifiers';

import * as baseTheme from './Label.scss';

export {Action};

export interface Props {
  children?: string,
  id: string,
  action?: Action,
  hidden?: boolean,
  style?: React.CSSProperties,
  theme?: any,
};

export function labelID(id: string) {
  return `${id}Label`;
}

export default function Label({children, id, action, hidden, style, theme}: Props) {
  const className = classNames(
    theme.Label,
    hidden && theme.hidden,
  );

  const actionMarkup = action
    ? buttonFrom(action, {plain: true})
    : null;

  return (
    <div className={className}>
      <label id={labelID(id)} htmlFor={id} className={theme.Text} style={style}>{children}</label>
      {actionMarkup}
    </div>
  );
}

export default themr(LABEL, baseTheme)(Label);
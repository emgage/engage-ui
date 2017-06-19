import * as React from 'react';
import { themr } from 'react-css-themr';
import Item, {Position} from './Item';

import { CONNECTED } from '../ThemeIdentifiers';
import * as baseTheme from './Connected.scss';

export interface Props {
  left?: React.ReactNode,
  right?: React.ReactNode,
  children?: React.ReactNode,
  style?: React.CSSProperties,
  theme?: any,
}

export interface State {
  focused?: Position | null,
}

const Connected = ({
  children,
  left,
  right,
  style,
  theme,
}: Props) => {
  if (left == null && right == null) {
    return React.Children.only(children);
  }

  const leftConnectionMarkup = left
    ? <Item position={Position.Left}>{left}</Item>
    : null;

  const rightConnectionMarkup = right
    ? <Item position={Position.Right}>{right}</Item>
    : null;

  return (
    <div className={theme.Connected} style={style}>
      {leftConnectionMarkup}
      <Item position={Position.Primary}>
        {children}
      </Item>
      {rightConnectionMarkup}
    </div>
  );
}

export default themr(CONNECTED, baseTheme)(Connected);
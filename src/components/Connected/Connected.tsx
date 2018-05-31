import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { CONNECTED } from '../ThemeIdentifiers';
import Item, { Position } from './Item';

import * as baseTheme from './Connected.scss';

export interface Props {
  // Align component to left
  left?: React.ReactNode;
  // Align component to right
  right?: React.ReactNode;
  // Display given text or render any node inside component
  children?: React.ReactNode;
  // Style to be injected via css
  customStyle?: React.CSSProperties;
  // Theme to be injected via css-themr
  theme?: any;
}

export interface State {
  focused?: Position | null;
}

const connected = ({
  children,
  left,
  right,
  customStyle,
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
    <div className={theme.connected} style={customStyle}>
      {leftConnectionMarkup}
      <Item position={Position.Primary}>
        {children}
      </Item>
      {rightConnectionMarkup}
    </div>
  );
};

export default themr(CONNECTED, baseTheme)(connected) as ThemedComponentClass<Props, State>;

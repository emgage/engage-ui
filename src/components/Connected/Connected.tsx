import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
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
  componentStyle?: React.CSSProperties;
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
  componentStyle,
  theme,
}: Props) => {
  if (left == null && right == null) {
    return React.Children.only(children) as JSX.Element;
  }

  const leftConnectionMarkup = left
    ? <Item position={Position.Left}>{left}</Item>
    : null;

  const rightConnectionMarkup = right
    ? <Item position={Position.Right}>{right}</Item>
    : null;

  return (
    <div className={theme.connected} style={componentStyle}>
      {leftConnectionMarkup}
      <Item position={Position.Primary}>
        {children}
      </Item>
      {rightConnectionMarkup}
    </div>
  );
};

export default themr(CONNECTED, baseTheme)(connected) as ThemedComponentClass<Props, State>;

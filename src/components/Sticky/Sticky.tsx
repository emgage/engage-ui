import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { STICKY } from '../ThemeIdentifiers';
import { classNames } from '@shopify/react-utilities/styles';
import * as baseTheme from './Sticky.scss';

export type Position = 'top' | 'bottom';

export interface Props {
  children?: React.ReactNode;
  position: Position;
  componentStyle?: React.CSSProperties;
  componentClass?: string;
  // Theme to be injected via css-themr.
  theme?: any;
}

const Sticky = ({ position, theme, componentClass, componentStyle, children }:Props) => {

  const classes = classNames(
    position === 'top' ? theme.headerSticky : theme.footerSticky,
    theme.stickyStyle,
    componentClass
  );

  return (
    <div className={ classes } style={ componentStyle }>
      {children}
    </div>
  );
};

export default themr(STICKY, baseTheme)(Sticky) as ThemedComponentClass<Props, {}>;

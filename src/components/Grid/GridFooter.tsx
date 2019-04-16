import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { GRID } from '../ThemeIdentifiers';
import * as baseTheme from './Grid.scss';

export type GridType = 'block' | 'list';

// All prototypes type
export interface Props {
  children?: React.ReactNode;
  // Custom style
  componentStyle?: any;
  // Set a custom class
  componentClass?: string;
  // Theme to be injected via css-themr
  theme?: any;
}

const GridFooter = ({
  children,
  componentClass,
  componentStyle,
  theme,
}: Props) => {
  const gridFooterClass = classNames(
    theme.gridFooter,
    componentClass
  );

  return <div style={componentStyle} className={gridFooterClass}>{children}</div>;
};

export default themr(GRID, baseTheme)(GridFooter) as ThemedComponentClass<Props, {}>;

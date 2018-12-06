import * as React from 'react';
import { themr } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { GRID } from '../ThemeIdentifiers';
import * as baseTheme from './Grid.scss';

export type GridType = 'block' | 'list';

// All prototypes type
export interface Props {
  children?: React.ReactNode;
  // Custom style
  componentStyle?: any;
  // Custom class
  componentClass?: string;
  // Theme to be injected via css-themr
  theme?: any;
}

const GridHeader = ({
  children,
  componentClass,
  componentStyle,
  theme,
}: Props) => {
  const gridHeaderClass = classNames(
    theme.gridHeader,
    componentClass
  );

  return <div style={componentStyle} className={gridHeaderClass}>{children}</div>;
};

export default themr(GRID, baseTheme)(GridHeader);

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

const GridTitle = ({
  children,
  componentClass,
  componentStyle,
  theme,
}: Props) => {
  const gridTitleClass = classNames(
    theme.gridTitle,
    componentClass
  );

  return <h3 style={componentStyle} className={gridTitleClass}>{children}</h3>;
};

export default themr(GRID, baseTheme)(GridTitle);

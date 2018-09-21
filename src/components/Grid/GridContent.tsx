import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { GRID } from '../ThemeIdentifiers';
import * as baseTheme from './Grid.scss';

import { GridType } from './Grid';

// All prototypes type
export interface Props {
  children?: React.ReactNode;
  // Custom style
  componentStyle?: any;
  // Custom class
  componentClass?: string;
  // Prop to select the grid type, currently there are two block & list
  gridType?: GridType;
  // Theme to be injected via css-themr
  theme?: any;
}

const GridContent = ({
  children,
  componentClass,
  componentStyle,
  gridType = 'block',
  theme,
}: Props) => {
  const gridContentClass = classNames(
    theme.gridContent,
    theme[gridType],
    componentClass
  );

  return <div style={componentStyle} className={gridContentClass}>{children}</div>;
};

export default themr(GRID, baseTheme)(GridContent) as ThemedComponentClass<Props, {}>;

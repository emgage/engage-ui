import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
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
  // Prop to handle callback function
  onClick?(returnValue?: any): any;
  // Prop to decide what value needs to be returned with callback
  returnValue?: any;
  // Theme to be injected via css-themr
  theme?: any;
}

const GridContent = ({
  children,
  componentClass,
  componentStyle,
  gridType = 'block',
  onClick,
  returnValue,
  theme,
}: Props) => {
  const gridContentClass = classNames(
    theme.gridContent,
    theme[gridType],
    componentClass
  );

  return <div onClick={event => onClick ? onClick(returnValue ? returnValue : event) : ''} style={componentStyle} className={gridContentClass}>{children}</div>;
};

export default themr(GRID, baseTheme)(GridContent) as ThemedComponentClass<Props, {}>;

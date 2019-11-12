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
  // Prop to disable onClick method
  disableClick?: boolean;
  // Prop to handle callback function
  onClick?(returnValue?: any): any;
  // Prop to decide what value needs to be returned with callback
  returnValue?: any;
  // Theme to be injected via css-themr
  theme?: any;
}

const GridHeader = ({
  children,
  componentClass,
  componentStyle,
  onClick,
  returnValue,
  theme,
}: Props) => {
  const gridHeaderClass = classNames(
    theme.gridHeader,
    componentClass
  );

  return <div onClick={event => onClick ? onClick(returnValue ? returnValue : event) : ''} style={componentStyle} className={gridHeaderClass}>{children}</div>;
};

export default themr(GRID, baseTheme)(GridHeader) as ThemedComponentClass<Props, {}>;

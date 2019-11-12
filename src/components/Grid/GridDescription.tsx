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

const GridDescription = ({
  children,
  componentClass,
  componentStyle,
  onClick,
  returnValue,
  theme,
}: Props) => {
  const gridDescriptionClass = classNames(
    theme.gridDescription,
    componentClass
  );

  return <p onClick={event => onClick ? onClick(returnValue ? returnValue : event) : ''} style={componentStyle} className={gridDescriptionClass}>{children}</p>;
};

export default themr(GRID, baseTheme)(GridDescription) as ThemedComponentClass<Props, {}>;

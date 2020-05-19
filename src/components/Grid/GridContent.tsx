import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { GRID } from '../ThemeIdentifiers';
import * as baseTheme from './Grid.scss';

import { GridType, GridStyle } from './Grid';

// All prototypes type
export interface Props {
  children?: React.ReactNode;
  // Custom style
  componentStyle?: any;
  // Set a custom class
  componentClass?: string;
  // Prop to select the grid type, currently there are two block & list
  gridType?: GridType;
  // Prop to select Grid style
  gridStyle?:GridStyle;
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
  gridStyle = 'lift',
  onClick,
  returnValue,
  theme,
}: Props) => {
  const gridContentClass = classNames(
    theme.gridContent,
    theme[gridType],
    theme[gridStyle],
    componentClass
  );

  const thisChildren = React.Children.map(children, (child: React.ReactElement<any>) => {
    if (onClick && !child.props.disableClick) {
      return React.cloneElement(child, { onClick, returnValue });
    }

    return React.cloneElement(child);
  });

  return <div style={componentStyle} className={gridContentClass}>{thisChildren}</div>;
};

export default themr(GRID, baseTheme)(GridContent) as ThemedComponentClass<Props, {}>;

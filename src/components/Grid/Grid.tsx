import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { GRID } from '../ThemeIdentifiers';
import * as baseTheme from './Grid.scss';

export type GridType = 'block' | 'list';
export type GridStyle = 'plain' | 'basic' | 'lift';

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

  // Theme to be injected via css-themr
  theme?: any;
}

const Grid = ({
  children,
  componentClass,
  componentStyle,
  gridType = 'block',
  gridStyle = 'lift',
  theme,
}: Props) => {
  const gridClass = classNames(
    theme.grid,
    theme[`grid_${gridType}`],
    theme[`grid_${gridStyle}`],
    componentClass
  );

  return (
    <div style={componentStyle} className={gridClass}>
      {
        React.Children.map(children, (child: React.ReactElement<any>) => {
          return React.cloneElement(child, { gridType });
        })
      }
    </div>
  );
};

export default themr(GRID, baseTheme)(Grid) as ThemedComponentClass<Props, {}>;

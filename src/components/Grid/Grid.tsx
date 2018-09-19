import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
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
  // Prop to select the grid type, currently there are two block & list
  gridType?: GridType;
  // Theme to be injected via css-themr
  theme?: any;
}

const Grid = ({
  children,
  componentClass,
  componentStyle,
  gridType = 'block',
  theme,
}: Props) => {
  const gridClass = classNames(
    theme.grid,
    theme[`grid_${gridType}`],
    componentClass
  );

  console.log('theme:', theme);
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

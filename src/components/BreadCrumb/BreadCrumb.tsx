import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { BREADCRUMB } from '../ThemeIdentifiers';
import * as baseTheme from './Breadcrumb.scss';

export type Direction = 'left' | 'right';
export type Type = 'default' | 'disabled' | 'active';

export interface ISourceData {
  name: React.ReactNode;
  style?: React.CSSProperties;
  type: Type;
}

// All prototypes type
export interface Props {
  style?: React.CSSProperties;
  // Direction prop defines the direction in which breadcrumb start
  direction?: Direction;
  // Array of items render in breadcrumb
  source: ISourceData[];
  // Callback function whenever user click on breadcrumb
  onBreadcrumbClick?(): void;
  // Set theme for breadcrumb
  theme?: any;
}

// Breadcrumb component bind items from sourcedata.
class Breadcrumb extends React.Component<Props, {}> {

  renderBreadcrumbItems() {
    const { direction, theme } = this.props;

    // Classes for Active Breadcrumb 
    const itemClassesActive = classNames(
      direction === 'left' && theme.left,
      direction === 'right' && theme.right
    );

    // Classes for Default Breadcrumb
    const itemClassesdefault = classNames(
      direction === 'left' && theme.left,
      direction === 'right' && theme.right,
      theme.default
    );

    // Classes for Disabled Breadcrumb
    const itemClassesDisable = classNames(
      direction === 'left' && theme.left,
      direction === 'right' && theme.right,
      theme.disabled
    );

    return this.props.source.map((child, index) => {
      return <li key={index} className={child.type === 'disabled' ? itemClassesDisable : child.type === 'default' ? itemClassesdefault : itemClassesActive} onClick={child.type === 'disabled' ? undefined : this.props.onBreadcrumbClick} style={child.style}>{child.name}</li>;
    });
  }
  // Render Breadcrumb and it's items
  render() {
    const { theme, direction, style } = this.props;

    // Combination of classes required for breadcrumb component
    const classes = classNames(
      theme.breadcrumb,
      direction === 'left' && theme.left,
      direction === 'right' && theme.right
    );

    return (
      <ul className={classes} style={style}>
        {this.renderBreadcrumbItems()}
      </ul>
    );
  }
}

export default themr(BREADCRUMB, baseTheme)(Breadcrumb) as ThemedComponentClass<Props, {}>;

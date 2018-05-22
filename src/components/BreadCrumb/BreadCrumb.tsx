import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { BREADCRUMB } from '../ThemeIdentifiers';
import * as baseTheme from './BreadCrumb.scss';

export type Direction = 'left' | 'right';
export type Type = 'default' | 'disabled' | 'active';
export type DisplayStyle = 'yellow' | 'green' | 'blue' | 'primary';

export interface ISourceData {
  name: React.ReactNode;
  style?: React.CSSProperties;
  type: Type;
  onBreadcrumbClick?(): void;
}

// All prototypes type
export interface Props {
  style?: React.CSSProperties;
  // Direction prop defines the direction in which breadcrumb start
  direction?: Direction;
  // Array of items render in breadcrumb
  source: ISourceData[];
  // User can choose display color theme for Breadcrumb component
  displayStyle?: DisplayStyle;
  // Set theme for breadcrumb
  theme?: any;
}

// Breadcrumb component bind items from sourcedata.
class BreadCrumb extends React.Component<Props, {}> {

  renderBreadcrumbItems() {
    const { direction = 'left', theme, source } = this.props;

    return source.map((child, index) => {
      const classnames = classNames(
        theme[direction],
        theme[child.type]
      );
      return <li key={index} className={classnames} onClick={child.type === 'disabled' ? undefined : child.onBreadcrumbClick} style={child.style}>{child.name}</li>;
    });
  }
  // Render Breadcrumb and it's items
  render() {
    const { theme, style, direction = 'left', displayStyle = '' } = this.props;

    // Combination of classes required for breadcrumb component
    const classes = classNames(
      displayStyle === 'primary' ? theme.breadcrumbPrimary : theme.breadcrumb,
      theme[displayStyle],
      theme[direction]
    );

    return (
      <ul className={classes} style={style}>
        {this.renderBreadcrumbItems()}
      </ul>
    );
  }
}

export default themr(BREADCRUMB, baseTheme)(BreadCrumb) as ThemedComponentClass<Props, {}>;

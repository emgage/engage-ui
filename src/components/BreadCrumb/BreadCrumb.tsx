import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { BREADCRUMB } from '../ThemeIdentifiers';
import * as baseTheme from './Breadcrumb.scss';

export type Direction = 'left' | 'right';
export type Type = 'default' | 'disabled' | 'active';
export type DisplayStyle = 'yellow' | 'green' | 'blue' | 'primary';

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
  // User can choose display color theme for Breadcrumb component
  displayStyle?: DisplayStyle;
  // Set theme for breadcrumb
  theme?: any;
}

// Breadcrumb component bind items from sourcedata.
class Breadcrumb extends React.Component<Props, {}> {

  renderBreadcrumbItems() {
    const { direction, theme } = this.props;

    return this.props.source.map((child, index) => {
      debugger;
      const classnames = classNames(
        theme[direction ? direction : 'left'],
        theme[child.type]
      );
      return <li key={index} className={classnames} onClick={child.type === 'disabled' ? undefined : this.props.onBreadcrumbClick} style={child.style}>{child.name}</li>;
    });
  }
  // Render Breadcrumb and it's items
  render() {
    const { theme, direction, style, displayStyle } = this.props;

    // Combination of classes required for breadcrumb component
    const classes = classNames(
      displayStyle === 'primary' ? theme.breadcrumbPrimary : theme.breadcrumb,
      theme[displayStyle ? displayStyle : ''],
      theme[direction ? direction : 'left']
    );

    return (
      <ul className={classes} style={style}>
        {this.renderBreadcrumbItems()}
      </ul>
    );
  }
}

export default themr(BREADCRUMB, baseTheme)(Breadcrumb) as ThemedComponentClass<Props, {}>;

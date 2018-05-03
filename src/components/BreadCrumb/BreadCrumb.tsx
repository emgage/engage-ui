import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { BREADCRUMB } from '../ThemeIdentifiers';
import * as baseTheme from './BreadCrumb.scss';

export type Alignment = 'left' | 'right';

export interface ISourceData {
  name?: any;
  style?: any;
  type?: any;
}

// All prototypes type
export interface Props {
  className?: any;
  // Alignment prop defines the direction in which breadcrumb start
  alignment?: Alignment;
  // Set theme for breadcrumb
  theme?: any;
  // Array of items render in breadcrumb
  source: ISourceData[];
  // Callback function whenever user click on breadcrumb
  onBreadCrumbClick?(): void;
}

// BreadCrumb component bind items from sourcedata.
class BreadCrumb extends React.Component<Props, {}> {

  renderBreadCrumbItems() {
    const itemClasses = classNames(
      baseTheme['breadcrumbItem'],
      this.props.alignment === 'left' && this.props.theme.ileft,
      this.props.alignment === 'right' && this.props.theme.iright
    );

    return this.props.source.map((child, index) => {
      return child.type === 'disable' ?
        (<li key={index} className={itemClasses} style={child.style} >{child.name}</li>) :
        (<li key={index} className={itemClasses} onClick={this.props.onBreadCrumbClick} style={child.style}><a style={child.style}>{child.name}</a></li>);
    });
  }
  // Render Breadcrumb and it's items
  render() {
    const { className, theme, alignment } = this.props;

    // Combination of classes required for breadcrumb component
    const classes = classNames(
      theme.breadcrumb,
      alignment === 'left' && theme.left,
      alignment === 'right' && theme.right,
      className
    );

    return (
      <ul className={classes}>
        {this.renderBreadCrumbItems()}
      </ul>
    );
  }
}

export default themr(BREADCRUMB, baseTheme)(BreadCrumb) as ThemedComponentClass<Props, {}>;

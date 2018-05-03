import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { BREADCRUMB } from '../ThemeIdentifiers';
import * as baseTheme from './BreadCrumb.scss';

export type Alignment = 'left' | 'right';
export type Style = 'default' | 'disabled' | 'active';

export interface ISourceData {
  name: any;
  style?: any;
  type: any;
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
    const itemClassesActive = classNames(
      baseTheme['breadcrumbItem'],
      this.props.alignment === 'left' && this.props.theme.left,
      this.props.alignment === 'right' && this.props.theme.right
    );

    const itemClassesdefault = classNames(
      baseTheme['breadcrumbItem'],
      this.props.alignment === 'left' && this.props.theme.left,
      this.props.alignment === 'right' && this.props.theme.right,
      this.props.theme.default
    );

    const itemClassesDisable = classNames(
      this.props.alignment === 'left' && this.props.theme.left,
      this.props.alignment === 'right' && this.props.theme.right,
      this.props.theme.disabled
    );

    // const disabledStyle: any = { background: 'grey', pointer: 'normal' };

    return this.props.source.map((child, index) => {
      return <li key={index} className={child.type === 'disabled' ? itemClassesDisable : child.type === 'default' ? itemClassesdefault : itemClassesActive} onClick={child.type === 'disabled' ? undefined : this.props.onBreadCrumbClick} style={child.style}>{child.name}</li>;
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

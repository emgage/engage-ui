import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities';
import { COLUMN } from '../ThemeIdentifiers';
import * as baseTheme from './Column.scss';

export type ResponsiveWidth =
    '1-1' |
    '1-2' |
    '1-3' |
    '1-4' |
    '1-5' |
    '1-6' |
    '1-7' |
    '1-8' |
    '1-9' |
    '1-10' |
    '2-3' |
    '2-4' |
    '2-5' |
    '2-6' |
    '2-7' |
    '2-8' |
    '2-9' |
    '2-10' |
    '3-4' |
    '3-5' |
    '3-6' |
    '3-7' |
    '3-8' |
    '3-9' |
    '3-10' |
    '4-5' |
    '4-6' |
    '4-7' |
    '4-8' |
    '4-9' |
    '4-10' |
    '5-6' |
    '5-7' |
    '5-8' |
    '5-9' |
    '5-10' |
    '6-7' |
    '6-8' |
    '6-9' |
    '6-10' |
    '7-8' |
    '7-9' |
    '7-10' |
    '8-9' |
    '8-10' |
    '9-10';

export interface Props {
  small?: ResponsiveWidth;
  medium?: ResponsiveWidth;
  large?: ResponsiveWidth;
  extraLarge?: ResponsiveWidth;
  style?: React.CSSProperties;
  theme?: any;
}

class Column extends React.PureComponent<Props, {}> {

  getClassName = (resWidth: ResponsiveWidth, resType: string): string => {
    const columnClassPrefix = `column-width-${resType === 'extraLarge' ? 'xlarge' : resType}-`;
    return this.props.theme[columnClassPrefix + resWidth];
  }

  render() {
    let className = '';

    if (this.props.small) {
      className = classNames(this.getClassName(this.props.small, 'small'), className);
    }
    if (this.props.medium) {
      className = classNames(this.getClassName(this.props.medium, 'medium'), className);
    }
    if (this.props.large) {
      className = classNames(this.getClassName(this.props.large, 'large'), className);
    }
    if (this.props.extraLarge) {
      className = classNames(this.getClassName(this.props.extraLarge, 'extraLarge'), className);
    }

    return (
            <div className={className} style={this.props.style}>
                {this.props.children}
            </div>
    );
  }
}

export default themr(COLUMN, baseTheme)(Column) as ThemedComponentClass<Props, {}>;

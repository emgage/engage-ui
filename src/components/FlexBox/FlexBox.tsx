import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities';
import { FLEXBOX } from '../ThemeIdentifiers';
import { FlexAlign, FlexDirection, FlexJustify } from './FlexProps';
import * as baseTheme from './FlexBox.scss';

export interface Props {
  inline?: boolean;
  direction?: FlexDirection ;
  justify?: FlexJustify;
  align?: FlexAlign;
  style?: React.CSSProperties;
  theme?: any;
}

class FlexBox extends React.PureComponent<Props, {}> {
  render() {
    const {
            inline,
            direction ,
            justify,
            align,
         } = this.props;

    let className = inline ? this.props.theme.inline : this.props.theme.flex;
        // set direction property css
    switch (direction) {
      case FlexDirection.Column:
        className = classNames(this.props.theme.column, className);
        break;
      case FlexDirection.RowReverse:
        className = classNames(this.props.theme.rowReverse, className);
        break;
      case FlexDirection.ColumnReverse:
        className = classNames(this.props.theme.columnReverse, className);
        break;
      case FlexDirection.Row:
      default:
        className = classNames(this.props.theme.row, className);
        break;
    }
        // set justify property css
    switch (justify) {
      case FlexJustify.End:
        className = classNames(this.props.theme.contentEnd, className);
        break;
      case FlexJustify.Center:
        className = classNames(this.props.theme.contentCenter, className);
        break;
      case FlexJustify.SpaceAround:
        className = classNames(this.props.theme.contentAround, className);
        break;
      case FlexJustify.SpaceBetween:
        className = classNames(this.props.theme.contentBetween, className);
        break;
      case FlexJustify.Start:
      default:
        className = classNames(this.props.theme.contentStart, className);
        break;
    }
        // set align property css
    switch (align) {
      case FlexAlign.Start:
        className = classNames(this.props.theme.alignStart, className);
        break;
      case FlexAlign.End:
        className = classNames(this.props.theme.alignEnd, className);
        break;
      case FlexAlign.Center:
        className = classNames(this.props.theme.alignCenter, className);
        break;
      case FlexAlign.Stretch:
      default:
        className = classNames(this.props.theme.alignStretch, className);
        break;
    }

    return (
            <div className={className} style={this.props.style}>
                {this.props.children}
            </div>
    );
  }
}

export default themr(FLEXBOX, baseTheme)(FlexBox) as ThemedComponentClass<Props, {}>;

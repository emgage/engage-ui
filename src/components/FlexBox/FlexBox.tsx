import * as React from 'react';
import { themr } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities';
import { FLEXBOX } from '../ThemeIdentifiers';
import { FlexAlign, FlexDirection, FlexJustify } from './FlexProps';
import * as baseTheme from './FlexBox.scss';

export interface Props {
  inline?: boolean,
  direction?: FlexDirection ,
  justify?: FlexJustify,
  align?: FlexAlign,
  style?: React.CSSProperties,
  theme?: any,
}

class FlexBox extends React.PureComponent<Props, {}> {
    render() {
        const {
            inline,
            direction ,
            justify,
            align,
         } = this.props;

        let className = inline ? this.props.theme.Inline : this.props.theme.Flex;
        // set direction property css
        switch (direction) {
            case FlexDirection.Column:
                className = classNames(this.props.theme.Column, className);
                break;
            case FlexDirection.RowReverse:
                className = classNames(this.props.theme.RowReverse, className);
                break;
            case FlexDirection.ColumnReverse:
                className = classNames(this.props.theme.ColumnReverse, className);
                break;
            case FlexDirection.Row:
            default:
                className = classNames(this.props.theme.Row, className);
                break;
        }
        // set justify property css
        switch (justify) {
            case FlexJustify.End:
                className = classNames(this.props.theme.ContentEnd, className);
                break;
            case FlexJustify.Center:
                className = classNames(this.props.theme.ContentCenter, className);
                break;
            case FlexJustify.SpaceAround:
                className = classNames(this.props.theme.ContentAround, className);
                break;
            case FlexJustify.SpaceBetween:
                className = classNames(this.props.theme.ContentBetween, className);
                break;
            case FlexJustify.Start:
            default:
                className = classNames(this.props.theme.ContentStart, className);
                break;
        }
        // set align property css
        switch (align) {
            case FlexAlign.Start:
                className = classNames(this.props.theme.AlignStart, className);
                break;
            case FlexAlign.End:
                className = classNames(this.props.theme.AlignEnd, className);
                break;
            case FlexAlign.Center:
                className = classNames(this.props.theme.AlignCenter, className);
                break;
            case FlexAlign.Stretch:
            default:
                className = classNames(this.props.theme.AlignStretch, className);
                break;
        }

        return (
            <div className={className} style={this.props.style}>
                {this.props.children}
            </div>
        );
    }
};

export default themr(FLEXBOX, baseTheme)(FlexBox);

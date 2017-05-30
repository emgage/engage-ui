import * as React from 'react';
import { FlexAlign, FlexDirection, FlexJustify } from './FlexProps';

export interface Props {
  inline?: boolean,
  direction?: FlexDirection ,
  justify?: FlexJustify,
  align?: FlexAlign,
}

export default class FlexBox extends React.PureComponent<Props, {}> {
    render() {
        const {
            inline,
            direction ,
            justify,
            align,
         } = this.props;

        let className = inline ? 'd-inline-flex' : 'd-flex';
        // set direction property css
        switch (direction) {
            case FlexDirection.Column:
                className += ' flex-column';
                break;
            case FlexDirection.RowReverse:
                className += ' flex-row-reverse';
                break;
            case FlexDirection.ColumnReverse:
                className += ' flex-column-reverse';
                break;
            case FlexDirection.Row:
            default:
                className += ' flex-row';
                break;
        }
        // set justify property css
        switch (justify) {
            case FlexJustify.End:
                className += ' justify-content-end';
                break;
            case FlexJustify.Center:
                className += ' justify-content-center';
                break;
            case FlexJustify.SpaceAround:
                className += ' justify-content-around';
                break;
            case FlexJustify.SpaceBetween:
                className += ' justify-content-between';
                break;
            case FlexJustify.Start:
            default:
                className += ' justify-content-start';
                break;
        }
        // set align property css
        switch (align) {
            case FlexAlign.Start:
                className += ' align-items-start';
                break;
            case FlexAlign.End:
                className += ' align-items-end';
                break;
            case FlexAlign.Center:
                className += ' align-items-center';
                break;
            case FlexAlign.Stretch:
            default:
                className += ' align-items-stretch';
                break;
        }
        return (
            <div className={className}>
                {this.props.children}
            </div>
        );
    }
}


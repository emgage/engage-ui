import * as React from 'react';
import { FlexAlign, FlexDirection, FlexJustify } from './FlexProps';

export interface Props {
  inline?: boolean,
  direction?: string ,
  justify?: string,
  align?: string,
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
            case FlexDirection.COLUMN:
                className += ' flex-column';
                break;
            case FlexDirection.ROW_REVERSE:
                className += ' flex-row-reverse';
                break;
            case FlexDirection.COLUMN_REVERSE:
                className += ' flex-column-reverse';
                break;
            case FlexDirection.ROW:
            default:
                className += ' flex-row';
                break;
        }
        // set justify property css
        switch (justify) {
            case FlexJustify.END:
                className += ' justify-content-end';
                break;
            case FlexJustify.CENTER:
                className += ' justify-content-center';
                break;
            case FlexJustify.SPACE_AROUND:
                className += ' justify-content-around';
                break;
            case FlexJustify.SPACE_BETWEEN:
                className += ' justify-content-between';
                break;
            case FlexJustify.START:
            default:
                className += ' justify-content-start';
                break;
        }
        // set align property css
        switch (align) {
            case FlexAlign.START:
                className += ' align-items-start';
                break;
            case FlexAlign.END:
                className += ' align-items-end';
                break;
            case FlexAlign.CENTER:
                className += ' align-items-center';
                break;
            case FlexAlign.STRETCH:
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


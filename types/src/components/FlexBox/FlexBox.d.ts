import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export declare type FlexAlign = 'Start' | 'Center' | 'End' | 'Stretch';
export declare type FlexJustify = 'Start' | 'Center' | 'End' | 'SpaceAround' | 'SpaceBetween';
export declare type FlexDirection = 'Row' | 'RowReverse' | 'Column' | 'ColumnReverse';
export declare type FlexWrap = 'NoWrap' | 'Wrap' | 'WrapReverse';
export interface Props {
    inline?: boolean;
    direction?: FlexDirection;
    justify?: FlexJustify;
    align?: FlexAlign;
    wrap?: FlexWrap;
    componentStyle?: React.CSSProperties;
    componentClass?: string;
    theme?: any;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

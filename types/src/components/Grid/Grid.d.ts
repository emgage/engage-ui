import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export declare type GridType = 'block' | 'list';
export declare type GridStyle = 'plain' | 'basic' | 'lift';
export interface Props {
    children?: React.ReactNode;
    componentStyle?: any;
    componentClass?: string;
    gridType?: GridType;
    gridStyle?: GridStyle;
    theme?: any;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

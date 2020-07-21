import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export declare type Position = 'top' | 'bottom';
export declare type fotType = 'inline' | 'fixed' | 'inline';
export interface Props {
    children?: React.ReactNode;
    position: Position;
    componentStyle?: React.CSSProperties;
    componentClass?: string;
    footerType?: fotType;
    theme?: any;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

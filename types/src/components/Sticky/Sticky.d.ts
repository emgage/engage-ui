import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export declare type Position = 'top' | 'bottom';
export interface Props {
    children?: React.ReactNode;
    position: Position;
    componentStyle?: React.CSSProperties;
    componentClass?: string;
    theme?: any;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

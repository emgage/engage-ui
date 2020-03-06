import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export declare type GridType = 'block' | 'list';
export interface Props {
    children?: React.ReactNode;
    componentStyle?: any;
    componentClass?: string;
    disableClick?: boolean;
    onClick?(returnValue?: any): any;
    returnValue?: any;
    theme?: any;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

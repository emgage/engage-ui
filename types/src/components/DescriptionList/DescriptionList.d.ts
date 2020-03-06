import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export declare type Type = 'default' | 'divider';
export interface Props {
    children?: React.ReactNode;
    componentType?: Type;
    theme?: any;
    componentStyle?: string;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

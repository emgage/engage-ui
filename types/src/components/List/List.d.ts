import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export declare type Type = 'bullet' | 'number' | 'default' | 'striped' | 'divider';
export interface Props {
    children?: React.ReactNode;
    componentType?: Type;
    theme?: any;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

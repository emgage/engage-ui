import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export interface Props {
    children?: React.ReactNode;
    theme?: any;
    image?: string;
    componentName?: string;
    email?: string;
    onClick?(val?: any): boolean;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { GridType } from './Grid';
export interface Props {
    children?: React.ReactNode;
    componentStyle?: any;
    componentClass?: string;
    gridType?: GridType;
    onClick?(returnValue?: any): any;
    returnValue?: any;
    theme?: any;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

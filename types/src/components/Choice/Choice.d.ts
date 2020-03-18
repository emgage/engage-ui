import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export declare type Error = boolean | string;
export interface Props {
    componentId: string;
    label: string;
    disabled?: Boolean;
    error?: Error;
    labelHidden?: boolean;
    children?: React.ReactNode;
    helpText?: React.ReactNode;
    theme?: any;
}
export declare function helpTextID(id: string): string;
export declare function errorID(id: string): string;
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { Props as LabelProps, Action, labelID } from '../Label';
export { Action, labelID };
export declare type Error = string;
export interface Props {
    autoSuggest?: boolean;
    componentId: LabelProps['componentId'];
    label: string;
    errors?: [string] | Error;
    action: LabelProps['action'];
    helpText?: React.ReactNode;
    disabled?: boolean;
    children?: React.ReactNode;
    labelHidden?: boolean;
    required?: boolean;
    focused?: boolean;
    hasValue?: boolean;
    componentStyle?: React.CSSProperties;
    componentClass?: string;
    theme?: any;
}
export declare function errorID(id: string): string;
export declare function helpTextID(id: string): string;
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

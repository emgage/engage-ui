import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export interface Props {
    label: string;
    labelHidden?: boolean;
    helpText?: React.ReactNode;
    checked?: boolean;
    componentId?: string;
    name?: string;
    errors?: [string];
    value?: any;
    disabled?: boolean;
    theme?: any;
    onChange?(newValue: boolean): void;
    onFocus?(): void;
    onBlur?(): void;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { Action, Error } from '../Labelled';
export declare type Option = string | {
    value: string;
    label: string;
    disabled?: boolean;
};
export interface Group {
    title: string;
    options: Option[];
}
export interface Props {
    options?: Option[];
    groups?: (Group | Option)[];
    backdropHidden?: boolean;
    label: string;
    labelAction?: Action;
    labelHidden?: boolean;
    loading?: boolean;
    helpText?: React.ReactNode;
    componentId?: string;
    name?: string;
    errors?: [Error] | null;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    value?: string;
    placeholder?: string;
    theme?: any;
    onChange?(selected: string): void;
    onFocus?(): void;
    onBlur?(): void;
    markIfRequired?: boolean;
}
declare const select: ({ componentId, name, groups, options, labelHidden, labelAction, loading, helpText, label, errors, value, placeholder, disabled, readOnly, backdropHidden, required, onChange, onFocus, onBlur, theme, markIfRequired }: Props) => React.JSX.Element;
export { select as UnthemedSelect };
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

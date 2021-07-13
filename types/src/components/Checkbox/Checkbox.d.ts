import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { Error } from '../Choice';
export interface Props {
    checked?: boolean | 'indeterminate';
    componentId?: string;
    disabled?: boolean;
    error?: Error;
    errors?: [string];
    helpText?: React.ReactNode;
    label: string;
    labelHidden?: boolean;
    name?: string;
    onBlur?(): void;
    onChange?(newValue: boolean): void;
    onFocus?(): void;
    theme?: any;
    value?: string;
    getErrors?(errors: any, name?: string): void;
}
export interface State {
    checked: boolean | 'indeterminate';
}
declare class Checkbox extends React.PureComponent<Props, State> {
    constructor(props: Props);
    componentWillReceiveProps(newProps: Props): void;
    handleChange: (event: any) => void;
    render(): JSX.Element;
}
export { Checkbox as UnthemedCheckbox };
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export interface State {
    activeDelete?: boolean;
    deleteIconOnHover?: boolean;
}
export interface Props {
    active?: boolean;
    clickHandler?(event: React.FormEvent<HTMLElement>): void;
    childrenClickHandler?(event: React.FormEvent<HTMLElement>): void;
    children: React.ReactElement<any>;
    componentClass?: string;
    header: React.ReactElement<any>;
    index: number;
    style?: any;
    toggle?(index: number): void;
    theme?: any;
    position?: string;
    icon?: string;
    isDelete?: boolean;
    activeDelete?: boolean;
    onDeleteClick?: any;
    rotate?: any;
    key?: any;
}
declare const _default: ThemedComponentClass<Props, never>;
export default _default;

import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export interface INavigationData {
    id?: number;
    label?: React.ReactNode;
    icon?: React.ReactNode;
    divider?: boolean | null;
    parentDivider?: boolean | null;
    currentApp?: boolean | null;
    children?: React.ReactNode;
    action?(arg?: string | number | boolean | null): void | null;
}
export interface Props {
    theme?: any;
    accordian: boolean;
    activeItem?: number | null;
    source: INavigationData[];
    drawerOpen: boolean;
    hideCollapse: boolean;
    drawerExpand: boolean;
    drawerStyle?: any;
    onCollapse?(value: boolean): void;
}
export interface State {
    activeDrawerId: string;
    popoverActive2: boolean;
    anchorEl2?: HTMLElement;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

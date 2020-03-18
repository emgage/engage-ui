import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export interface Props extends React.HTMLProps<HTMLDivElement> {
    children?: React.ReactNode;
    vertical?: boolean;
    horizontal?: boolean;
    shadow?: boolean;
    theme?: any;
}
export interface State {
    topShadow: boolean;
    bottomShadow: boolean;
}
declare function forNode(node: HTMLElement): HTMLElement;
declare const _default: ThemedComponentClass<Props, State>;
export default _default;
export { forNode };

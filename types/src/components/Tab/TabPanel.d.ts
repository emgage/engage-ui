import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export declare type Position = 'top' | 'bottom' | 'left' | 'right';
export declare type Alignment = 'left' | 'center' | 'right';
export declare type Orientation = 'verticle' | 'horizontal';
export interface Props {
    position: Position;
    alignment: Alignment;
    defaultTabId?: string;
    componentStyle?: React.CSSProperties;
    theme?: any;
    orientation?: Orientation;
}
export interface State {
    activeTabId: string;
}
declare const _default: ThemedComponentClass<Props, State>;
export default _default;

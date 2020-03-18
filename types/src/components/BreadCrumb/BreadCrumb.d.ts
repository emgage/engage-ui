import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export declare type Direction = 'left' | 'right';
export declare type Type = 'default' | 'disabled' | 'active';
export declare type DisplayStyle = 'yellow' | 'green' | 'blue' | 'primary';
export interface ISourceData {
    name: React.ReactNode;
    style?: React.CSSProperties;
    type: Type;
    onBreadcrumbClick?(): void;
}
export interface Props {
    componentStyle?: React.CSSProperties;
    direction?: Direction;
    source: ISourceData[];
    displayStyle?: DisplayStyle;
    theme?: any;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { Position } from './Item';
export interface Props {
    left?: React.ReactNode;
    right?: React.ReactNode;
    children?: React.ReactNode;
    componentStyle?: React.CSSProperties;
    theme?: any;
}
export interface State {
    focused?: Position | null;
}
declare const _default: ThemedComponentClass<Props, State>;
export default _default;

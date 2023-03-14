import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { PreferredPosition } from '../PositionedOverlay';
export interface Props {
    children?: React.ReactNode;
    content: any;
    leftSpace?: number;
    active?: boolean;
    light?: boolean;
    preferredPosition?: PreferredPosition;
    activatorWrapper?: string;
    theme?: any;
    hideTip?: boolean;
    bgColor?: any;
    componentClass?: string;
}
export interface State {
    active: boolean;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

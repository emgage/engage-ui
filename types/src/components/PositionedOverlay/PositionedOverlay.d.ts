import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { Rect } from '@shopify/javascript-utilities/geometry';
import { PreferredPosition, PreferredAlignment } from './math';
export { PreferredPosition };
export { PreferredAlignment };
export declare type Positioning = 'below' | 'above';
export interface OverlayDetails {
    left: number;
    desiredHeight: number;
    positioning: Positioning;
    measuring: boolean;
    activatorRect: Rect;
    anchorPosition: number;
}
export interface Props {
    active: boolean;
    activator: HTMLElement;
    componentStyle?: any;
    preferredPosition?: PreferredPosition;
    preferredAlignment?: PreferredAlignment;
    fullWidth?: boolean;
    fixed?: boolean;
    preloadedPopover?: boolean;
    theme?: any;
    render(overlayDetails: OverlayDetails): React.ReactNode;
    onScrollOut?(): void;
}
export interface State {
    measuring: boolean;
    activatorRect: Rect;
    anchorPosition: number;
    left: number;
    top: number | null;
    height: number;
    width: number | null;
    positioning: Positioning;
    zIndex: number | null;
    outsideScrollableContainer: boolean;
    lockPosition: boolean;
}
export declare function intersectionWithViewport(rect: Rect, viewport?: Rect): Rect;
declare const _default: ThemedComponentClass<Props, State>;
export default _default;

import { Rect } from '@shopify/javascript-utilities/geometry';
export declare type PreferredPosition = 'above' | 'below' | 'belowRight' | 'belowLeft' | 'left' | 'right' | 'mostSpace';
export declare type PreferredAlignment = 'left' | 'center' | 'right';
export interface Margins {
    activator: number;
    container: number;
    horizontal: number;
}
export declare function calculateVerticalPosition(activatorRect: Rect, overlayRect: Rect, overlayMargins: Margins, scrollableContainerRect: Rect, containerRect: Rect, preferredPosition: PreferredPosition, fixed: boolean | undefined): {
    height: number;
    top: number;
    positioning: string;
};
export declare function calculateHorizontalPosition(activatorRect: Rect, overlayRect: Rect, containerRect: Rect, overlayMargins: Margins, preferredAlignment: PreferredAlignment, preferredPosition: PreferredPosition, preloadedPopover: boolean, isPopover?: any): number;
export declare function rectIsOutsideOfRect(inner: Rect, outer: Rect): boolean;

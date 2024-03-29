import * as React from 'react';
import { PreferredAlignment, PreferredPosition } from '../PositionedOverlay';
export interface Props {
    addArrow: boolean;
    componentId: string;
    active: boolean;
    preferredPosition?: PreferredPosition;
    children?: React.ReactNode;
    activator: HTMLElement;
    popoverRef(node: HTMLElement | null): any;
    isPopover?: any;
    onClose(): void;
    tipPosition?: number;
    preferredAlignment?: PreferredAlignment;
    colSize?: number;
    rowIndex?: number;
}
export default class PopoverOverlay extends React.PureComponent<Props, never> {
    render(): React.JSX.Element | null;
    private renderOverlay;
    private renderPopover;
}

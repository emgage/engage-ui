import * as React from 'react';
import { PreferredPosition } from '../PositionedOverlay';
export interface Props {
    componentId: string;
    leftSpace?: number;
    active: boolean;
    light?: boolean;
    preferredPosition?: PreferredPosition;
    children?: React.ReactNode;
    activator: HTMLElement;
    hideTip?: boolean;
    bgColor?: any;
    componentClass?: string;
    onClose(): void;
}
export default class TooltipOverlay extends React.PureComponent<Props, never> {
    render(): JSX.Element | null;
    private renderOverlay;
    private renderTooltip;
}

import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { PreferredAlignment, PreferredPosition } from '../PositionedOverlay';
export interface Props {
    manualInActive?: boolean;
    addArrow?: boolean;
    anchorEl?: any;
    children?: React.ReactNode;
    closeOnClickInside?: boolean;
    componentClass?: string;
    componentStyle?: any;
    onClose?(): void;
    preferredPosition?: PreferredPosition;
    preferredAlignment?: PreferredAlignment;
    theme?: any;
    open?: boolean;
}
export interface State {
    active: boolean;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

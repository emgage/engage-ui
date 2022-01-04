import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { PreferredPosition } from '../PositionedOverlay';
export interface Props {
    tabDescription?: React.ReactNode;
    tabId: string;
    activeTabId?: string;
    onClick?(): void;
    componentStyle?: React.CSSProperties;
    theme?: any;
    title?: string;
    preferredPosition?: PreferredPosition;
    showTooltip?: boolean;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

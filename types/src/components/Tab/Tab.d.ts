import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export interface Props {
    tabDescription?: React.ReactNode;
    tabId: string;
    activeTabId?: string;
    onClick?(): void;
    componentStyle?: React.CSSProperties;
    theme?: any;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

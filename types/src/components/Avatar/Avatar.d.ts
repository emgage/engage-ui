import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import * as React from "react";
export declare type Size = 'small' | 'medium' | 'large';
export interface Props {
    componentSize?: Size;
    componentName?: string;
    initials?: string;
    customer?: boolean;
    source?: string;
    accessibilityLabel?: string;
    theme?: any;
    imageComponentStyle?: React.CSSProperties;
    defaultSource?: string;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

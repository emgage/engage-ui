import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export interface Props {
    children?: React.ReactNode;
    condensed?: boolean;
    componentTitle?: string;
    helpText?: React.ReactNode;
    componentStyle?: React.CSSProperties;
    theme?: any;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

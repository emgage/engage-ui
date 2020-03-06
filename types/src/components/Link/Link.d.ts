import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export interface Props {
    url?: string;
    children?: React.ReactNode;
    external?: boolean;
    theme?: any;
    onClick?(): void;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

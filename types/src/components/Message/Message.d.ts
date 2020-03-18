import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export interface Props {
    children?: React.ReactNode;
    isVisible?: boolean;
    componentId: string;
    componentStyle?: React.CSSProperties;
    theme?: any;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

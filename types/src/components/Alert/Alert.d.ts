import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export interface State {
    isActive?: boolean;
}
export interface Props {
    children?: React.ReactNode;
    componentType?: string;
    theme?: any;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

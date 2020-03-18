import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export interface Props {
    componentStyle?: any;
    componentClass?: string;
    segmented?: boolean;
    children?: React.ReactNode;
    theme?: any;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

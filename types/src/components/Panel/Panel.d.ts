import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export interface Props {
    heading: string | React.ReactNode;
    video?: React.ReactNode;
    children?: React.ReactNode;
    theme?: any;
    componentStyle?: React.CSSProperties;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

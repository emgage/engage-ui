import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { HeadingTagName } from '../../types';
export declare type Size = 'h1' | 'h2' | 'h3' | 'h4' | 'subtitle';
export declare type Color = 'text';
export interface Props {
    componentClass?: string;
    componentStyle?: any;
    element?: HeadingTagName;
    children?: React.ReactNode;
    headingSize?: Size;
    headingColor?: Color;
    theme?: any;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

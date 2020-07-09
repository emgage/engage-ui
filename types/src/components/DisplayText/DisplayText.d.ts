import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { HeadingTagName } from '../../types';
export declare type Size = 'small' | 'medium' | 'large' | 'extraLarge';
export declare type Color = 'text' | 'darker' | 'darkest' | 'mid' | 'reverse' | 'danger';
export interface Props {
    element?: HeadingTagName;
    children?: React.ReactNode;
    componentSize?: Size;
    componentColor?: Color;
    theme?: any;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { HeadingTagName } from '../../types';
export declare type Size = 'small' | 'medium' | 'large' | 'extraLarge';
export interface Props {
    element?: HeadingTagName;
    children?: React.ReactNode;
    componentSize?: Size;
    theme?: any;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export declare type Color = 'reverse' | 'normal' | 'disabled';
export declare type Size = 'small' | 'large';
export interface Props {
    componentSize?: Size;
    componentColor?: Color;
    accessibilityLabel?: string;
    theme?: any;
    componentStyle?: React.CSSProperties;
}
declare const spinner: ({ componentSize, componentColor, accessibilityLabel, theme, componentStyle, }: Props) => JSX.Element;
export { spinner as UnthemedSelect };
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { ComplexAction } from '../../types';
import { Props as IconProps } from '../Icon';
export declare type Size = 'slim' | 'large';
export interface Props {
    url?: string;
    children?: React.ReactNode;
    componentSize?: Size;
    fullWidth?: boolean;
    primary?: boolean;
    outline?: boolean;
    destructive?: boolean;
    disabled?: boolean;
    plain?: boolean;
    name?: string;
    external?: boolean;
    submit?: boolean;
    disclosure?: boolean;
    accessibilityLabel?: string;
    icon?: IconProps['source'];
    iconPosition?: boolean;
    componentStyle?: React.CSSProperties;
    componentClass?: string;
    componentId?: string;
    theme?: any;
    onClick?(e: React.FormEvent<HTMLElement>): void;
    onFocus?(): void;
    onBlur?(): void;
    title?: string;
}
declare const THEMEDBUTTON: ThemedComponentClass<Props, {}>;
export declare function buttonsFrom(action: ComplexAction, overrides?: Partial<Props>): React.ReactElement<Props>;
export declare function buttonsFrom(actions: ComplexAction[], overrides?: Partial<Props>): React.ReactElement<Props>[];
export declare function buttonFrom({ content, onAction, ...action }: ComplexAction, overrides?: Partial<Props>, key?: any): JSX.Element;
export default THEMEDBUTTON;

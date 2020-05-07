import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { Action } from '../../types';
import { Props as IconProps } from '../Icon';
export declare type Status = 'success' | 'info' | 'warning' | 'critical';
export interface Props {
    ariaLabel?: string;
    icon?: IconProps['source'];
    componentTitle?: string;
    status?: Status;
    action?: Action;
    secondaryAction?: Action;
    children?: React.ReactNode;
    theme?: any;
    onDismiss?(): void;
    secondaryText?: ISecondaryItems[];
}
interface ISecondaryItems {
    text: string;
    icon: string;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;

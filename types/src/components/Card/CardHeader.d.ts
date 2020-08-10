import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { DisableableAction } from '../../types';
export interface Props {
    children?: React.ReactNode;
    actions?: DisableableAction[];
    componentStyle?: any;
    componentClass?: string;
    theme?: any;
    onClick?(e: React.FormEvent<HTMLElement>): void;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
